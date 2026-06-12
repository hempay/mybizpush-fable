import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/** Split a string into per-word spans wrapped in overflow-hidden line masks,
 *  then slide the words up on scroll. */
export function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.04,
  y = "110%",
  once = true,
  start = "top 85%",
}: {
  children: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: string;
  once?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [children, delay, stagger, y, once, start]);

  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="line-mask inline-block align-bottom">
          <span className="reveal-word inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade+rise a block when it enters the viewport. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 40,
  start = "top 88%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}

/** Animated counter that counts up when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.n).toLocaleString() + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/** Refresh ScrollTrigger after route mounts (images/layout settle). */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);
}
