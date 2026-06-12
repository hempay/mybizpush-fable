import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import { useToast } from "@/lib/toast";
import { getLenis } from "@/lib/SmoothScroll";

interface ConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  timestamp: string;
  status: "new" | "contacted" | "completed";
}

const ConsultationContext = createContext<{ open: () => void }>({
  open: () => {},
});

export const useConsultation = () => useContext(ConsultationContext);

function saveLocally(request: ConsultationRequest) {
  try {
    const existing = localStorage.getItem("consultationRequests");
    const requests: ConsultationRequest[] = existing
      ? JSON.parse(existing)
      : [];
    requests.unshift(request);
    localStorage.setItem("consultationRequests", JSON.stringify(requests));
    return true;
  } catch (error) {
    console.error("Error saving consultation request:", error);
    return false;
  }
}

async function sendToWebhook(data: ConsultationRequest) {
  const WEBHOOK_URL =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    "https://your-n8n-instance.com/webhook/consultation";
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
  return response.json();
}

const FIELDS = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "Jane Okafor" },
  { id: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
  { id: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "+234 800 000 0000" },
] as const;

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { yPercent: 6, autoAlpha: 0, scale: 0.98 },
        { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      getLenis()?.start();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.message.trim()
    ) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your consultation request.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const request: ConsultationRequest = {
      id: `consultation_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
      status: "new",
    };

    try {
      await sendToWebhook(request);
      saveLocally(request);
      toast({
        title: "Consultation request submitted!",
        description: "Thank you for your interest. We'll contact you within 24 hours.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      saveLocally(request);
      toast({
        title: "Request saved",
        description: "Your request was saved. We'll contact you within 24 hours.",
      });
    } finally {
      setIsSubmitting(false);
      setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
      close();
    }
  };

  return (
    <ConsultationContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[9993] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={close}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-ink-2 border border-magenta/25 rounded-t-3xl sm:rounded-3xl p-7 sm:p-10"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-bone/15 text-ash hover:text-bone hover:border-magenta/60 transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <p className="font-body text-xs tracking-[0.3em] uppercase text-magenta mb-3">
              Free Consultation
            </p>
            <h2 className="font-display font-bold text-3xl text-bone leading-tight mb-3">
              Let's push your business forward.
            </h2>
            <p className="text-ash text-sm leading-relaxed mb-8">
              Fill out the form below and we'll get back to you within 24 hours
              with expert advice tailored to your needs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {FIELDS.map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="block font-body text-xs tracking-[0.2em] uppercase text-ash mb-2"
                  >
                    {f.label} *
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={formData[f.id]}
                    onChange={(e) => setField(f.id, e.target.value)}
                    className="w-full bg-ink border border-bone/15 rounded-xl px-4 py-3 text-bone placeholder:text-ash/50 text-sm transition-colors"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-xs tracking-[0.2em] uppercase text-ash mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project or consultation needs..."
                  value={formData.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className="w-full bg-ink border border-bone/15 rounded-xl px-4 py-3 text-bone placeholder:text-ash/50 text-sm resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-solid w-full rounded-full py-4 font-display font-bold text-bone tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Request →"}
              </button>

              <p className="text-[11px] text-ash/70 text-center leading-relaxed pt-1">
                By submitting this form, you agree to our Privacy Policy and
                Terms of Service. We respect your privacy and will never share
                your information.
              </p>
            </form>
          </div>
        </div>
      )}
    </ConsultationContext.Provider>
  );
}
