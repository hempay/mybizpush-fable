import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroCanvas } from "@/components/HeroCanvas";
import { Marquee } from "@/components/Marquee";
import { Magnetic } from "@/components/Magnetic";
import { ServiceModal } from "@/components/ServiceModal";
import { useConsultation } from "@/components/ConsultationModal";
import { Counter, FadeIn, RevealText, useScrollTriggerRefresh } from "@/lib/anim";
import { featuredServices, type Service } from "@/data/services";
import { featuredProducts } from "@/data/products";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const HEADLINE = ["WE PUSH", "BUSINESS", "FORWARD"];

function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { open } = useConsultation();

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-char",
        { yPercent: 115, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.028,
        }
      );
      gsap.fromTo(
        ".hero-fade",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.55,
        }
      );
      // parallax out on scroll
      gsap.to(contentRef.current, {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[90rem] mx-auto px-5 sm:px-8 pt-28 pb-20"
      >
        <p className="hero-fade font-body text-[11px] sm:text-xs tracking-[0.4em] uppercase text-bone/90 mb-6 sm:mb-10 flex items-center gap-3" style={{ visibility: ready ? undefined : "hidden" }}>
          <span className="w-8 h-px bg-magenta inline-block" />
          Digital Studio · Fintech · Growth — Abuja → Worldwide
        </p>

        <h1 className="font-display font-extrabold text-bone leading-[0.92] tracking-tight mb-8 sm:mb-12">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-1 whitespace-nowrap">
              {line.split("").map((ch, ci) => (
                <span
                  key={ci}
                  className="hero-char inline-block will-change-transform text-[9.4vw] lg:text-[8.5vw]"
                  style={{
                    visibility: ready ? undefined : "hidden",
                    whiteSpace: "pre",
                  }}
                >
                  {li === 1 && ci >= 3 && ci <= 5 ? (
                    <span className="text-gradient">{ch}</span>
                  ) : (
                    ch
                  )}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <p className="hero-fade max-w-md text-ash text-base sm:text-lg leading-relaxed" style={{ visibility: ready ? undefined : "hidden" }}>
            Delivering cutting-edge digital solutions, fintech applications,
            and comprehensive business services to drive your success.
          </p>

          <div className="hero-fade flex flex-col sm:flex-row gap-4" style={{ visibility: ready ? undefined : "hidden" }}>
            <Magnetic strength={0.25}>
              <button
                onClick={open}
                data-cursor
                className="btn-solid rounded-full px-9 py-4 font-display font-bold text-bone hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Start a Project →
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                to="/services"
                data-cursor
                className="btn-pill border border-bone/30 px-9 py-4 font-display font-bold text-bone w-full sm:w-auto text-center"
              >
                <span className="btn-fill" />
                Explore Services
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="hero-fade mt-12 sm:mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-body tracking-[0.2em] uppercase text-bone/70" style={{ visibility: ready ? undefined : "hidden" }}>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-magenta" />
            RC NO: 7350200
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-volt" />
            Trusted by 1000+ clients
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-bone/50">
        <span className="font-body text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-magenta to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Manifesto + stats                                                   */
/* ------------------------------------------------------------------ */

const MANIFESTO =
  "MyBizPush is the engine behind ambitious brands — we design, build, market and scale digital products that move businesses from idea to industry leader.";

function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mani-word",
        { color: "rgba(154, 143, 166, 0.25)" },
        {
          color: "#f4eff7",
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".mani-copy",
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 1000, suffix: "+", label: "Clients Served" },
    { value: 20, suffix: "", label: "Expert Services" },
    { value: 7, suffix: "", label: "Products Shipped" },
    { value: 2, suffix: "", label: "Countries Registered" },
  ];

  return (
    <section ref={rootRef} className="relative py-28 sm:py-40">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
        <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-10 flex items-center gap-3">
          <span className="tabular-nums">01</span>
          <span className="w-8 h-px bg-magenta/50 inline-block" />
          Who we are
        </p>

        <p className="mani-copy font-display font-bold leading-[1.15] tracking-tight text-3xl sm:text-5xl lg:text-6xl max-w-6xl">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i} className="mani-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10 border border-bone/10 mt-20 sm:mt-28">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="bg-ink p-8 sm:p-12">
              <p className="font-display font-extrabold text-4xl sm:text-6xl text-bone mb-2">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-ash">
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services rail — pinned horizontal scroll on desktop                 */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  index,
  onOpen,
  className = "",
}: {
  service: Service;
  index: number;
  onOpen: (s: Service) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onOpen(service)}
      data-cursor
      className={`card-hover group relative text-left bg-ink-2 border border-bone/10 rounded-2xl p-7 flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(36rem 18rem at 30% -10%, rgba(212,0,209,0.14), transparent 60%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-display font-extrabold text-5xl text-stroke-magenta leading-none tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-ash border border-bone/15 rounded-full px-3 py-1">
          {service.tag}
        </span>
      </div>
      <div className="relative mt-12">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-bone leading-snug mb-3 group-hover:text-gradient transition-colors">
          {service.title}
        </h3>
        <p className="text-ash text-sm leading-relaxed mb-5">
          {service.description}
        </p>
        <span className="font-body text-xs tracking-[0.25em] uppercase text-magenta inline-flex items-center gap-2">
          Details
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
            <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function ServicesRail({ onOpen }: { onOpen: (s: Service) => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current!;
      const getDistance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-ink-2/40 border-y border-bone/5 overflow-hidden">
      <div className="lg:h-screen flex flex-col justify-center py-20 lg:py-0">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-8 w-full mb-10 lg:mb-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
                <span className="tabular-nums">02</span>
                <span className="w-8 h-px bg-magenta/50 inline-block" />
                What we do
              </p>
              <RevealText
                as="h2"
                className="font-display font-extrabold text-bone tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl"
              >
                Services built to accelerate growth
              </RevealText>
            </div>
            <Magnetic>
              <Link
                to="/services"
                data-cursor
                className="btn-pill border border-bone/25 px-7 py-3.5 font-body text-sm text-bone whitespace-nowrap"
              >
                <span className="btn-fill" />
                All 20 services →
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Desktop: horizontal rail (pinned). Mobile: snap-scroll row. */}
        <div
          ref={trackRef}
          className="flex gap-5 px-5 sm:px-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0 will-change-transform"
        >
          {featuredServices.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              onOpen={onOpen}
              className="w-[19rem] sm:w-[22rem] lg:w-[24rem] shrink-0 snap-start min-h-[22rem]"
            />
          ))}
          <Link
            to="/services"
            data-cursor
            className="card-hover group w-[19rem] sm:w-[22rem] shrink-0 snap-start min-h-[22rem] rounded-2xl border border-magenta/30 bg-gradient-to-br from-magenta/15 to-volt/15 p-7 flex flex-col items-start justify-end"
          >
            <span className="font-display font-extrabold text-4xl text-bone leading-tight mb-4">
              +12 more
              <br />
              services
            </span>
            <span className="font-body text-xs tracking-[0.25em] uppercase text-magenta">
              View the full index →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Products stack                                                      */
/* ------------------------------------------------------------------ */

function ProductsStack() {
  useScrollTriggerRefresh();

  return (
    <section className="relative py-28 sm:py-40">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
              <span className="tabular-nums">03</span>
              <span className="w-8 h-px bg-magenta/50 inline-block" />
              What we've shipped
            </p>
            <RevealText
              as="h2"
              className="font-display font-extrabold text-bone tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl"
            >
              Products people live on
            </RevealText>
          </div>
          <Magnetic>
            <Link
              to="/products"
              data-cursor
              className="btn-pill border border-bone/25 px-7 py-3.5 font-body text-sm text-bone whitespace-nowrap"
            >
              <span className="btn-fill" />
              All 7 products →
            </Link>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-8 lg:gap-0">
          {featuredProducts.map((p, i) => (
            <div
              key={p.name}
              className="lg:sticky"
              style={{ top: `calc(5.5rem + ${i * 2.5}rem)` }}
            >
              <div
                className="relative overflow-hidden rounded-3xl border border-bone/10 bg-ink-2 p-8 sm:p-14 lg:min-h-[28rem] flex flex-col lg:flex-row gap-10 lg:items-center"
                style={{
                  background: `linear-gradient(135deg, ${p.accentSoft} 0%, #0e0517 55%)`,
                }}
              >
                <div className="flex-1">
                  <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: p.accent }}>
                    {p.tagline}
                  </p>
                  <h3 className="font-display font-extrabold text-bone text-4xl sm:text-6xl tracking-tight mb-5">
                    {p.name}
                  </h3>
                  <p className="text-ash leading-relaxed max-w-xl mb-8">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {p.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="font-body text-xs text-bone/80 border border-bone/15 rounded-full px-4 py-1.5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8 lg:w-72 shrink-0">
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl flex items-center justify-center border border-bone/10"
                    style={{ background: p.accentSoft }}
                  >
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      className="h-20 sm:h-24 w-auto object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6 w-full text-center">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display font-bold text-bone text-lg sm:text-xl">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export default function Home({ ready }: { ready: boolean }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main>
        <Hero ready={ready} />

        <Marquee className="py-6 border-y border-bone/10 bg-ink-2/60" baseSpeed={70}>
          {["Fintech", "Web Design", "App Development", "Digital Marketing", "Branding", "SEO", "Music & Media", "Data Analytics"].map(
            (w) => (
              <span key={w} className="flex items-center">
                <span className="font-display font-bold text-2xl sm:text-3xl text-bone/90 px-6 whitespace-nowrap">
                  {w}
                </span>
                <span className="text-magenta text-xl">✦</span>
              </span>
            )
          )}
        </Marquee>

        <Manifesto />
        <ServicesRail onOpen={setSelectedService} />
        <ProductsStack />

        <Marquee className="py-6 border-y border-bone/10 bg-ink-2/60" baseSpeed={70} reverse>
          {["Hempay", "Plemuz", "Yuafomi", "Pailop", "Ceremotik", "Hyparrow", "BundleBoss"].map((w) => (
            <span key={w} className="flex items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-stroke px-6 whitespace-nowrap">
                {w}
              </span>
              <span className="text-volt text-xl">✦</span>
            </span>
          ))}
        </Marquee>
      </main>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <Footer />
    </div>
  );
}
