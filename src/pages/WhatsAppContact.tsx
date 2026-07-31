import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Magnetic } from "@/components/Magnetic";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { FadeIn, RevealText, useScrollTriggerRefresh } from "@/lib/anim";
import { useToast } from "@/lib/toast";
import { buildWhatsAppLink, WHATSAPP_PHONE } from "@/lib/whatsapp";

const FIELDS = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "Jane Okafor" },
  { id: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
] as const;

/**
 * Dedicated WhatsApp contact route. We collect full name, email and inquiry,
 * build the pre-filled chat link from those values, and email a confirmation
 * in the background so the inquiry is on record either way.
 */
export default function WhatsAppContact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  useScrollTriggerRefresh();

  const whatsappUrl = buildWhatsAppLink(formData);
  const isComplete =
    !!formData.fullName.trim() && !!formData.email.trim() && !!formData.message.trim();

  const setField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address so we can confirm your inquiry.",
        variant: "destructive",
      });
      return;
    }

    // Open the tab synchronously — popup blockers reject windows opened after an await.
    const chatWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phoneNumber: "",
          message: formData.message.trim(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      toast({
        title: "Inquiry received",
        description: `We've emailed a confirmation to ${formData.email.trim()}. Continue the conversation on WhatsApp.`,
      });
    } catch (error) {
      console.error("Failed to record WhatsApp inquiry:", error);
      // The WhatsApp hand-off already happened, so this is not a blocking failure.
      toast({
        title: "Continue on WhatsApp",
        description: "We couldn't email your confirmation, but your chat is ready to send.",
      });
    } finally {
      setIsSubmitting(false);
      if (!chatWindow) {
        toast({
          title: "Pop-up blocked",
          description: 'Use the "open the chat directly" link below to continue.',
          variant: "destructive",
        });
      }
    }
  };

  const preview = `Hello, i am making an inquiry.\n\nName: ${formData.fullName.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`;

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-magenta/50 inline-block" />
            Direct line
          </p>
          <RevealText
            as="h1"
            className="font-display font-extrabold text-bone tracking-tight leading-[0.92] text-5xl sm:text-7xl lg:text-8xl mb-8"
            start="top 95%"
          >
            Talk to us on WhatsApp
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="text-ash text-lg max-w-2xl leading-relaxed">
              Tell us who you are and what you need. We'll pre-fill your message so
              you can send it in one tap — and email you a confirmation too.
            </p>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <FadeIn y={40}>
              <form
                onSubmit={handleSubmit}
                className="bg-ink-2 border border-bone/10 rounded-3xl p-7 sm:p-10 space-y-5"
              >
                {FIELDS.map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={`wa-${f.id}`}
                      className="block font-body text-xs tracking-[0.2em] uppercase text-ash mb-2"
                    >
                      {f.label} *
                    </label>
                    <input
                      id={`wa-${f.id}`}
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
                    htmlFor="wa-message"
                    className="block font-body text-xs tracking-[0.2em] uppercase text-ash mb-2"
                  >
                    Your Inquiry *
                  </label>
                  <textarea
                    id="wa-message"
                    required
                    rows={5}
                    placeholder="What would you like to ask us about?"
                    value={formData.message}
                    onChange={(e) => setField("message", e.target.value)}
                    className="w-full bg-ink border border-bone/15 rounded-xl px-4 py-3 text-bone placeholder:text-ash/50 text-sm resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor
                  className="w-full rounded-full py-4 font-display font-bold text-bone tracking-wide bg-[#25D366] hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon size={20} />
                  {isSubmitting ? "Opening WhatsApp..." : "Continue on WhatsApp"}
                </button>

                <p className="text-[11px] text-ash/70 text-center leading-relaxed pt-1">
                  Or{" "}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-magenta hover:underline"
                  >
                    open the chat directly
                  </a>{" "}
                  — +{WHATSAPP_PHONE}
                </p>
              </form>
            </FadeIn>

            <FadeIn y={40} delay={0.15}>
              <div className="rounded-3xl border border-bone/10 p-7 sm:p-10 bg-[radial-gradient(40rem_24rem_at_30%_0%,rgba(37,211,102,0.12),#0e0517_70%)]">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-ash mb-6">
                  Message preview
                </p>
                <div className="bg-ink border border-bone/10 rounded-2xl p-5">
                  <p className="text-sm text-bone/85 leading-relaxed whitespace-pre-wrap min-h-[8rem]">
                    {isComplete
                      ? preview
                      : "Fill in the form and your WhatsApp message will appear here, ready to send."}
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-bone/10 space-y-3 text-sm text-ash">
                  <p className="text-bone/80">
                    Suite 300, 3rd Floor, Copper House,
                    <br />
                    Plot 4 Street, Wuse Zone 5, Abuja
                  </p>
                  <a
                    href="tel:+2348123132609"
                    className="block text-bone/80 hover:text-magenta transition-colors"
                  >
                    +234 812 313 2609
                  </a>
                  <a
                    href="mailto:info@mybizpush.com"
                    className="block text-bone/80 hover:text-magenta transition-colors"
                  >
                    info@mybizpush.com
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-20 text-center">
            <Magnetic strength={0.25}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="btn-pill border border-bone/25 rounded-full px-10 py-4 font-display font-bold text-bone inline-flex items-center gap-2.5"
              >
                <span className="btn-fill" />
                <WhatsAppIcon /> Start the chat
              </a>
            </Magnetic>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
