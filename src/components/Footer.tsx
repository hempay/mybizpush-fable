import { Link } from "react-router-dom";
import { useConsultation } from "./ConsultationModal";
import { Magnetic } from "./Magnetic";
import { FadeIn } from "@/lib/anim";

const socials = [
  { name: "Facebook", href: "https://facebook.com/mybizpush" },
  { name: "Instagram", href: "https://instagram.com/mybizpush" },
  { name: "mybizpush.com", href: "https://mybizpush.com" },
];

export function Footer() {
  const { open } = useConsultation();

  return (
    <footer id="contact" className="relative bg-ink-2 border-t border-bone/5 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-magenta/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[90rem] mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-10">
        {/* CTA row */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 sm:pb-24 border-b border-bone/10">
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-5">
              Got an idea?
            </p>
            <h2 className="font-display font-extrabold text-bone leading-[0.95] tracking-tight text-5xl sm:text-7xl xl:text-8xl">
              Let's push it
              <br />
              <span className="text-gradient">forward.</span>
            </h2>
          </div>
          <Magnetic strength={0.25}>
            <button
              onClick={open}
              data-cursor
              className="btn-pill border border-bone/25 px-10 py-5 font-display font-bold text-lg text-bone"
            >
              <span className="btn-fill" />
              Get Free Consultation
            </button>
          </Magnetic>
        </FadeIn>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/lovable-uploads/389855c2-6d24-4395-b42f-cc218894b503.png"
                alt="MyBizPush Solutions Logo"
                className="h-9 w-9"
              />
              <span className="font-display font-bold text-bone text-lg">
                MyBizPush Solutions Limited
              </span>
            </div>
            <p className="text-ash text-sm leading-relaxed max-w-sm mb-4">
              Delivering innovative technology solutions and comprehensive
              business services to drive success worldwide.
            </p>
            <p className="text-ash/70 text-xs font-body tracking-widest uppercase">
              RC NO: 7350200 — Registered Company
            </p>
          </div>

          <div>
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-ash mb-6">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-bone/80 leading-relaxed">
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
                info@mybizpush.com.ng
              </a>
            </div>
            <div className="flex gap-5 mt-6">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-xs font-body tracking-widest uppercase text-ash hover:text-bone transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-ash mb-6">
              Quick Links
            </h3>
            <div className="space-y-3 text-sm">
              <Link to="/services" className="block text-bone/80 hover:text-magenta transition-colors">
                Our Services
              </Link>
              <Link to="/products" className="block text-bone/80 hover:text-magenta transition-colors">
                Products
              </Link>
              <a
                href="https://mybizpush.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-bone/80 hover:text-magenta transition-colors"
              >
                Official Website
              </a>
              <Link to="/privacy" className="block text-bone/80 hover:text-magenta transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-bone/80 hover:text-magenta transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="select-none pointer-events-none overflow-hidden -mb-4 sm:-mb-8" aria-hidden>
          <p className="font-display font-extrabold text-stroke leading-none tracking-tight text-center whitespace-nowrap text-[9.2vw]">
            MYBIZPUSH
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-8 border-t border-bone/10 text-xs text-ash">
          <p>© 2024 MyBizPush Solutions Limited. All rights reserved.</p>
          <p>Abuja · Nigeria — Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
