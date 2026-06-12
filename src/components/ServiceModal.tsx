import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/SmoothScroll";
import { useConsultation } from "./ConsultationModal";
import type { Service } from "@/data/services";

export function ServiceModal({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { open } = useConsultation();

  useEffect(() => {
    if (service) {
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 }
      );
      gsap.fromTo(
        panelRef.current,
        { yPercent: 8, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      getLenis()?.start();
      document.body.style.overflow = "";
    }
  }, [service]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[9993] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-ink-2 border border-magenta/25 rounded-t-3xl sm:rounded-3xl"
      >
        <div className="relative aspect-[16/8] overflow-hidden rounded-t-3xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-ink/60 backdrop-blur border border-bone/15 text-bone hover:border-magenta/60 transition-colors flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="p-7 sm:p-10 -mt-10 relative">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-magenta mb-3">
            {service.tag}
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-bone leading-tight mb-3">
            {service.title}
          </h2>
          <p className="text-ash mb-6">{service.description}</p>
          <p className="text-bone/70 text-sm leading-[1.8] mb-8">
            {service.details}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                open();
              }}
              className="btn-solid flex-1 rounded-full py-4 font-display font-bold text-bone hover:opacity-90 transition-opacity"
            >
              Get a Quote →
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-full py-4 font-display font-bold text-bone border border-bone/20 hover:border-magenta/60 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
