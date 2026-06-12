import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Infinite marquee whose speed and direction react to scroll velocity. */
export function Marquee({
  children,
  baseSpeed = 60,
  className = "",
  reverse = false,
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const half = track.scrollWidth / 2;
    let pos = 0;
    let velocityBoost = 0;

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocityBoost = self.getVelocity() / 220;
      },
    });

    const tick = (_t: number, delta: number) => {
      const dir = reverse ? 1 : -1;
      const speed = baseSpeed + Math.min(Math.abs(velocityBoost), 420);
      pos += (dir * speed * delta) / 1000;
      velocityBoost *= 0.93;
      // wrap seamlessly
      const wrapped = ((pos % half) + half) % half;
      gsap.set(track, { x: -wrapped });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [baseSpeed, reverse]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
