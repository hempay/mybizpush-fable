import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Magnetic } from "@/components/Magnetic";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span className="font-display font-extrabold text-stroke leading-none text-[42vw]">
            404
          </span>
        </div>
        <div className="relative z-10">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-magenta mb-5">
            Lost in the void
          </p>
          <h1 className="font-display font-extrabold text-bone text-4xl sm:text-6xl tracking-tight mb-5">
            This page got pushed
            <br />
            <span className="text-gradient">too far forward.</span>
          </h1>
          <p className="text-ash mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Magnetic strength={0.25}>
            <Link
              to="/"
              data-cursor
              className="btn-solid rounded-full px-10 py-4 font-display font-bold text-bone inline-block hover:opacity-90 transition-opacity"
            >
              ← Return Home
            </Link>
          </Magnetic>
        </div>
      </main>
    </div>
  );
}
