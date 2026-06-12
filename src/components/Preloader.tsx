import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const WORD = "MYBIZPUSH";

/** Counter + wordmark preloader with a curtain wipe. Plays once per session. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current!;
    const counter = counterRef.current!;
    const letters = root.querySelectorAll<HTMLElement>(".pre-letter");
    const obj = { n: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });

    tl.fromTo(
      letters,
      { yPercent: 120 },
      { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05 }
    )
      .to(
        obj,
        {
          n: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(obj.n)).padStart(3, "0");
          },
        },
        "<0.2"
      )
      .to(letters, {
        yPercent: -120,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.035,
      })
      .to(
        counter,
        { autoAlpha: 0, duration: 0.3 },
        "<"
      )
      .to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9995] bg-ink flex items-center justify-center"
      style={{ borderBottom: "1px solid rgba(212,0,209,0.3)" }}
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="overflow-hidden">
          <div className="flex">
            {WORD.split("").map((ch, i) => (
              <span
                key={i}
                className="pre-letter inline-block font-display font-extrabold text-bone leading-none tracking-tight text-[13vw] sm:text-[10vw] lg:text-[8vw] will-change-transform"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-ash font-body text-sm tracking-[0.3em] uppercase">
          <span className="w-10 h-px bg-magenta inline-block" />
          <span ref={counterRef} className="tabular-nums text-bone">000</span>
          <span className="w-10 h-px bg-volt inline-block" />
        </div>
      </div>
    </div>
  );
}
