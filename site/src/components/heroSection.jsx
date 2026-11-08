import React, { useMemo } from "react";

const headline =
  "Practical supply chain expertise. Smarter operations. Measurable results.";
const subheadline =
  "We transform supply chains into efficient, cost-effective and customer-focused systems that enable sustainable business growth across East Africa.";

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const AnimatedHeadline = React.memo(function AnimatedHeadline({
  text,
  startDelay = 0.2,
  maxTotal = 1.5,
  accentSentence = 2, // which sentence (0-based) is drawn in gold
}) {
  const words = useMemo(() => {
    const stagger = Math.min(0.03, maxTotal / text.length);
    let i = 0;
    let sentence = 0;
    return text.split(" ").map((word) => {
      const chars = word.split("").map((char) => ({
        char,
        delay: startDelay + i++ * stagger,
      }));
      i++; // the trailing space takes one slot so timing stays even
      const accent = sentence === accentSentence;
      if (word.endsWith(".")) sentence++;
      return { chars, accent };
    });
  }, [text, startDelay, maxTotal, accentSentence]);

  return (
    <h1
      aria-label={text}
      className="mb-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl"
    >
      {words.map((w, wi) => (
        <span
          key={wi}
          aria-hidden="true"
          className={`inline-block whitespace-nowrap ${
            w.accent ? "text-[#C9A227]" : ""
          }`}
        >
          {w.chars.map((c, ci) => (
            <span
              key={ci}
              className="hero-letter inline-block"
              style={{ animationDelay: `${c.delay}s` }}
            >
              {c.char}
            </span>
          ))}
          {"\u00A0"}
        </span>
      ))}
    </h1>
  );
});

function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#1F3A12] via-[#1F3A12] to-[#35582A] pb-16 pt-36 text-sm text-white md:pb-24"
    >
      <style>{`
        @keyframes heroLetterIn {
          from { opacity: 0; transform: translateY(0.6em); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroImageIn {
          from { opacity: 0; transform: translateX(60px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .hero-letter {
          opacity: 0;
          animation: heroLetterIn 0.5s ease-out forwards;
        }
        .hero-fade {
          opacity: 0;
          animation: heroFadeUp 0.7s ease-out forwards;
        }
        .hero-image {
          opacity: 0;
          animation: heroImageIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-letter, .hero-fade, .hero-image {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Background texture: faint dot grid and soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#C9A227]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left column: headline, subheadline, buttons */}
          <div className="text-center md:text-left">
            <span
              className="hero-fade mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-[#dde5d0] backdrop-blur"
              style={{ animationDelay: "0s" }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#C9A227]"
              />
              Supply chain consultancy in East Africa
            </span>

            <AnimatedHeadline text={headline} />

            <p
              className="hero-fade mx-auto mb-8 max-w-lg leading-relaxed text-[#dde5d0] md:mx-0"
              style={{ animationDelay: "1.6s" }}
            >
              {subheadline}
            </p>

            <div
              className="hero-fade flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
              style={{ animationDelay: "1.9s" }}
            >
              <a
                href="/services#related"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#1F3A12] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3A12]"
              >
                Explore Services
                <Arrow />
              </a>
              <a
                href="/contact#textme"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#1F3A12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3A12]"
              >
                Book a Consultation
              </a>
            </div>
          </div>

          {/* Right column: image with offset gold frame */}
          <div className="hero-image relative">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-[#C9A227]/60"
            />
            <img
              src="/heroimage.webp"
              alt="Supply Chain"
              className="relative w-full rounded-2xl object-cover shadow-2xl shadow-black/30 ring-1 ring-white/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;