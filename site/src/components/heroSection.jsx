import React, { useMemo } from "react";

const headline =
  "Practical supply chain expertise. Smarter operations. Measurable results.";
const subheadline =
  "We transform supply chains into efficient, cost-effective and customer-focused systems that enable sustainable business growth across East Africa.";

const AnimatedHeadline = React.memo(function AnimatedHeadline({
  text,
  startDelay = 0.2,
  maxTotal = 1.5,
}) {
  const words = useMemo(() => {
    const stagger = Math.min(0.03, maxTotal / text.length);
    let i = 0;
    return text.split(" ").map((word) => {
      const chars = word.split("").map((char) => ({
        char,
        delay: startDelay + i++ * stagger,
      }));
      i++; // the trailing space takes one slot so timing stays even
      return chars;
    });
  }, [text, startDelay, maxTotal]);

  return (
    <h1 aria-label={text} className="text-3xl md:text-5xl font-bold mb-6">
      {words.map((chars, wi) => (
        <span
          key={wi}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {chars.map((c, ci) => (
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
    <section id="home" className="bg-[#1F3A12] text-white pt-36 pb-10 overflow-hidden">
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

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column: headline, subheadline, buttons */}
          <div className="md:w-1/2">
            <AnimatedHeadline text={headline} />

            <p className="hero-fade  mb-8" style={{ animationDelay: "1.6s" }}>
              {subheadline}
            </p>

            <div
              className="hero-fade flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: "1.9s" }}
            >
              <a
                href="#services"
                className="text-center bg-[#C9A227] text-[#1F3A12] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="text-center border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#1F3A12] transition-colors"
              >
                Book a Consultation
              </a>
            </div>
          </div>

          {/* Right column: image */}
          <img
            src="/heroimage.webp"
            alt="Supply Chain"
            className="hero-image rounded-lg object-cover mt-10 md:mt-0 md:ml-8 md:w-1/2"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
