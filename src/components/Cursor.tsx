import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX - 4);
      yDot(e.clientY - 4);
      xRing(e.clientX - 18);
      yRing(e.clientY - 18);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]"
      );
      ring.classList.toggle("is-hovering", !!target);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
