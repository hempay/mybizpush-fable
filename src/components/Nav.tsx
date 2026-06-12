import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import { useConsultation } from "./ConsultationModal";
import { Magnetic } from "./Magnetic";
import { getLenis } from "@/lib/SmoothScroll";

const links = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "Products", to: "/products" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { open } = useConsultation();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      const items = menuRef.current!.querySelectorAll(".menu-item");
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" }
      );
      gsap.fromTo(
        items,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.07,
          delay: 0.3,
        }
      );
    } else {
      getLenis()?.start();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  // For now, "Contact" opens the consultation (contact) popup — same as "Start a Project".
  const openContact = () => {
    setMenuOpen(false);
    open();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9995] transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-ink/75 backdrop-blur-xl border-b border-bone/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-[90rem] mx-auto px-5 sm:px-8 h-[4.5rem] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/lovable-uploads/389855c2-6d24-4395-b42f-cc218894b503.png"
              alt="MyBizPush Solutions Logo"
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <span className="font-display font-bold text-bone tracking-tight text-lg">
              MyBizPush<span className="text-magenta">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <NavLink
                key={l.name}
                to={l.to}
                className={({ isActive }) =>
                  `nav-link font-body text-sm tracking-wide text-bone/80 hover:text-bone transition-colors ${
                    isActive ? "active text-bone" : ""
                  }`
                }
              >
                {l.name}
              </NavLink>
            ))}
            <button
              onClick={openContact}
              className="nav-link font-body text-sm tracking-wide text-bone/80 hover:text-bone transition-colors"
            >
              Contact
            </button>
            <Magnetic>
              <button
                onClick={open}
                className="btn-pill border border-bone/25 px-6 py-2.5 font-body text-sm text-bone"
              >
                <span className="btn-fill" />
                Start a Project
              </button>
            </Magnetic>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden relative z-[9995] w-11 h-11 flex flex-col items-center justify-center gap-[7px]"
          >
            <span
              className={`block w-7 h-[2px] bg-bone transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-7 h-[2px] bg-bone transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[9994] bg-ink-2 md:hidden flex-col justify-between pt-28 pb-10 px-7 ${
          menuOpen ? "flex" : "hidden"
        }`}
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex flex-col gap-2">
          {links.map((l, i) => (
            <div key={l.name} className="overflow-hidden">
              <Link
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="menu-item flex items-baseline gap-4 font-display font-bold text-5xl text-bone leading-tight will-change-transform"
              >
                <span className="text-xs font-body text-magenta tabular-nums">
                  0{i + 1}
                </span>
                {l.name}
              </Link>
            </div>
          ))}
          <div className="overflow-hidden">
            <button
              onClick={openContact}
              className="menu-item flex items-baseline gap-4 font-display font-bold text-5xl text-bone leading-tight will-change-transform"
            >
              <span className="text-xs font-body text-magenta tabular-nums">
                04
              </span>
              Contact
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            className="btn-solid rounded-full py-4 font-display font-bold text-bone w-full"
          >
            Start a Project →
          </button>
          <p className="text-ash text-xs font-body tracking-[0.2em] uppercase text-center">
            MyBizPush Solutions Limited — RC NO: 7350200
          </p>
        </div>
      </div>
    </>
  );
}
