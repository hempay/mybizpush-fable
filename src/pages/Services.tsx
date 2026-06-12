import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServiceModal } from "@/components/ServiceModal";
import { useConsultation } from "@/components/ConsultationModal";
import { Magnetic } from "@/components/Magnetic";
import { FadeIn, RevealText, useScrollTriggerRefresh } from "@/lib/anim";
import { allServices, type Service } from "@/data/services";

const TAGS = ["All", "Strategy", "Design", "Growth", "Build", "Create", "Business", "Media"];

export default function ServicesPage() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [tag, setTag] = useState("All");
  const { open } = useConsultation();
  useScrollTriggerRefresh();

  const visible =
    tag === "All" ? allServices : allServices.filter((s) => s.tag === tag);

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-magenta/50 inline-block" />
            The full index — {allServices.length} services
          </p>
          <RevealText
            as="h1"
            className="font-display font-extrabold text-bone tracking-tight leading-[0.92] text-5xl sm:text-7xl lg:text-8xl mb-8"
            start="top 95%"
          >
            Everything your business needs
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="text-ash text-lg max-w-2xl leading-relaxed">
              Comprehensive technology and business solutions designed to
              accelerate your growth and maximize your digital potential. Click
              any service to learn more.
            </p>
          </FadeIn>

          {/* Tag filter */}
          <FadeIn delay={0.3} className="flex flex-wrap gap-2.5 mt-12 mb-14">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-5 py-2 font-body text-sm transition-all duration-300 border ${
                  tag === t
                    ? "btn-solid border-transparent text-bone"
                    : "border-bone/15 text-ash hover:border-magenta/50 hover:text-bone"
                }`}
              >
                {t}
              </button>
            ))}
          </FadeIn>

          {/* Editorial index list */}
          <div className="border-t border-bone/10">
            {visible.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setSelected(s)}
                data-cursor
                className="group w-full text-left grid grid-cols-[auto_1fr_auto] sm:grid-cols-[5rem_1fr_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-8 border-b border-bone/10 hover:bg-magenta/[0.04] transition-colors px-2 sm:px-4"
              >
                <span className="font-display font-extrabold text-xl sm:text-3xl text-stroke-magenta tabular-nums">
                  {String(allServices.indexOf(s) + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-bold text-bone text-lg sm:text-2xl leading-snug group-hover:translate-x-2 transition-transform duration-300">
                  {s.title}
                </span>
                <span className="hidden sm:block text-ash text-sm leading-relaxed pr-4">
                  {s.description}
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden md:inline font-body text-[10px] tracking-[0.25em] uppercase text-ash border border-bone/15 rounded-full px-3 py-1">
                    {s.tag}
                  </span>
                  <span className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center text-bone group-hover:bg-magenta group-hover:border-magenta transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:rotate-45 transition-transform duration-300">
                      <path d="M3 11L11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <FadeIn className="mt-24">
            <div className="relative overflow-hidden rounded-3xl border border-magenta/25 bg-gradient-to-br from-magenta/15 via-ink-2 to-volt/15 p-10 sm:p-16 text-center">
              <h2 className="font-display font-extrabold text-bone text-3xl sm:text-5xl tracking-tight mb-4">
                Ready to get started?
              </h2>
              <p className="text-ash max-w-xl mx-auto mb-8 leading-relaxed">
                Let's discuss how our services can transform your business.
                Contact us for a free consultation.
              </p>
              <Magnetic strength={0.25}>
                <button
                  onClick={open}
                  data-cursor
                  className="btn-solid rounded-full px-10 py-4 font-display font-bold text-bone hover:opacity-90 transition-opacity"
                >
                  Get Free Consultation →
                </button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </main>

      <ServiceModal service={selected} onClose={() => setSelected(null)} />
      <Footer />
    </div>
  );
}
