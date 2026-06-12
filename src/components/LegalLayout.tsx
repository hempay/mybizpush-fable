import React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FadeIn, RevealText, useScrollTriggerRefresh } from "@/lib/anim";

export interface LegalSection {
  heading: string;
  body?: string;
  list?: string[];
  after?: string;
}

const CONTACT_BLOCK = [
  "MyBizPush Solutions Limited",
  "EIN: [Your EIN Number] (USA)",
  "RC NO: 7350200 (Nigeria)",
  "Registered in the United States of America and Nigeria",
  "Suite 300, 3rd Floor, Copper House, Plot 4 Street, Wuse Zone 5, Abuja",
  "Email: info@mybizpush.com",
  "Phone: +234 812 313 2609",
];

export function LegalLayout({
  kicker,
  title,
  sections,
  contactIntro,
}: {
  kicker: string;
  title: string;
  sections: LegalSection[];
  contactIntro: string;
}) {
  useScrollTriggerRefresh();

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-magenta/50 inline-block" />
            {kicker}
          </p>
          <RevealText
            as="h1"
            className="font-display font-extrabold text-bone tracking-tight leading-[0.95] text-5xl sm:text-7xl mb-6"
            start="top 95%"
          >
            {title}
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="text-ash mb-16">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </FadeIn>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <FadeIn key={s.heading} delay={Math.min(i * 0.04, 0.3)}>
                <section className="border border-bone/10 rounded-2xl p-7 sm:p-10 bg-ink-2/50">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display font-extrabold text-stroke-magenta text-2xl tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display font-bold text-bone text-xl sm:text-2xl">
                      {s.heading}
                    </h2>
                  </div>
                  {s.body && (
                    <p className="text-ash leading-[1.8] text-sm sm:text-base">
                      {s.body}
                    </p>
                  )}
                  {s.list && (
                    <ul className="mt-4 space-y-2.5">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-ash text-sm sm:text-base leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-magenta mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && (
                    <p className="text-ash leading-[1.8] text-sm sm:text-base mt-4">
                      {s.after}
                    </p>
                  )}
                </section>
              </FadeIn>
            ))}

            <FadeIn>
              <section className="border border-magenta/25 rounded-2xl p-7 sm:p-10 bg-gradient-to-br from-magenta/10 to-volt/10">
                <h2 className="font-display font-bold text-bone text-xl sm:text-2xl mb-4">
                  Contact Us
                </h2>
                <p className="text-ash leading-relaxed text-sm sm:text-base mb-6">
                  {contactIntro}
                </p>
                <div className="space-y-1.5 text-sm text-bone/80">
                  {CONTACT_BLOCK.map((line, i) => (
                    <p key={i} className={i === 0 ? "font-bold text-bone" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
