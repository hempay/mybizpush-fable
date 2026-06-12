import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Magnetic } from "@/components/Magnetic";
import { useConsultation } from "@/components/ConsultationModal";
import { FadeIn, RevealText, useScrollTriggerRefresh } from "@/lib/anim";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.68.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
    </svg>
  );
}

export default function ProductsPage() {
  const { open } = useConsultation();
  useScrollTriggerRefresh();

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-magenta/50 inline-block" />
            The portfolio — {products.length} products
          </p>
          <RevealText
            as="h1"
            className="font-display font-extrabold text-bone tracking-tight leading-[0.92] text-5xl sm:text-7xl lg:text-8xl mb-8"
            start="top 95%"
          >
            Apps built to be lived on
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="text-ash text-lg max-w-2xl leading-relaxed">
              Innovative applications designed to transform industries and
              create meaningful user experiences worldwide.
            </p>
          </FadeIn>

          <div className="mt-20 sm:mt-28 space-y-20 sm:space-y-32">
            {products.map((p, index) => (
              <FadeIn key={p.name} y={60}>
                <article
                  id={p.name.toLowerCase()}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  {/* Visual */}
                  <div className="[direction:ltr]">
                    <div
                      className="relative overflow-hidden rounded-3xl border border-bone/10 p-10 sm:p-14"
                      style={{
                        background: `radial-gradient(40rem 24rem at 30% 0%, ${p.accentSoft}, #0e0517 70%)`,
                      }}
                    >
                      <span
                        className="absolute top-6 right-7 font-display font-extrabold text-6xl sm:text-7xl text-stroke tabular-nums select-none whitespace-nowrap"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center justify-center py-8 sm:py-12">
                        <img
                          src={p.logo}
                          alt={`${p.name} logo`}
                          className="h-24 sm:h-32 w-auto object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center border-t border-bone/10 pt-8">
                        {p.stats.map((s) => (
                          <div key={s.label}>
                            <p className="font-display font-bold text-bone text-xl sm:text-2xl">
                              {s.value}
                            </p>
                            <p className="text-[10px] font-body tracking-wider uppercase text-ash mt-1">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="[direction:ltr]">
                    <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: p.accent }}>
                      {p.tagline}
                    </p>
                    <h2 className="font-display font-extrabold text-bone text-4xl sm:text-6xl tracking-tight mb-5">
                      {p.name}
                    </h2>
                    <p className="text-ash leading-relaxed mb-8">{p.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 text-sm text-bone/80">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: p.accent }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={p.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="btn-solid flex-1 rounded-full py-3.5 px-6 font-display font-bold text-sm text-bone inline-flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
                      >
                        <AppleIcon /> App Store
                      </a>
                      <a
                        href={p.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="btn-pill flex-1 border border-bone/25 rounded-full py-3.5 px-6 font-display font-bold text-sm text-bone inline-flex items-center justify-center gap-2.5"
                      >
                        <span className="btn-fill" />
                        <PlayIcon /> Play Store
                      </a>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn className="mt-28">
            <div className="relative overflow-hidden rounded-3xl border border-magenta/25 bg-gradient-to-br from-magenta/15 via-ink-2 to-volt/15 p-10 sm:p-16 text-center">
              <h2 className="font-display font-extrabold text-bone text-3xl sm:text-5xl tracking-tight mb-4">
                Ready to experience innovation?
              </h2>
              <p className="text-ash max-w-xl mx-auto mb-8 leading-relaxed">
                Join millions of users worldwide who trust our products for
                their daily needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.25}>
                  <button
                    onClick={open}
                    data-cursor
                    className="btn-solid rounded-full px-10 py-4 font-display font-bold text-bone hover:opacity-90 transition-opacity"
                  >
                    Get Free Consultation →
                  </button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link
                    to="/services"
                    data-cursor
                    className="btn-pill border border-bone/25 rounded-full px-10 py-4 font-display font-bold text-bone inline-block"
                  >
                    <span className="btn-fill" />
                    Explore Our Services
                  </Link>
                </Magnetic>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
