import { useCallback, useEffect, useRef, useState } from "react";

const INDUSTRIES = [
  { title: "FMCG Companies", text: "Optimizing supply chains for fast-moving consumer goods." },
  { title: "Manufacturers", text: "Streamlining production and distribution processes." },
  { title: "Logistics Providers", text: "Enhancing transportation and warehousing efficiency." },
  { title: "Retail Chains", text: "Improving inventory management and customer satisfaction." },
];

const AUTOPLAY_MS = 4500;
const GAP_PX = 16; // matches gap-4

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function Arrow({ dir, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous industry" : "Next industry"}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#c9a227] text-[#1F3A12] transition-colors duration-300 hover:bg-[#c9a227] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F3A12]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

export default function IndustriesSlider() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const perView = isLg ? 3 : isMd ? 2 : 1;
  const pages = Math.max(1, INDUSTRIES.length - perView + 1);

  const getStep = () => {
    const [a, b] = trackRef.current?.children ?? [];
    return a ? (b ? b.offsetLeft - a.offsetLeft : a.offsetWidth + GAP_PX) : 0;
  };

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current;
      if (!el) return;
      const index = Math.min(Math.max(i, 0), pages - 1);
      el.scrollTo({ left: index * getStep(), behavior: reduceMotion ? "auto" : "smooth" });
    },
    [pages, reduceMotion]
  );

  // Keep the active dot in sync with swipes, arrows and autoplay.
  const onScroll = () => {
    const el = trackRef.current;
    const step = getStep();
    if (!el || !step) return;
    setActive(Math.min(Math.max(Math.round(el.scrollLeft / step), 0), pages - 1));
  };

  // Autoplay: restarts after every change, stops on hover/focus and for reduced motion.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(() => goTo((active + 1) % pages), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduceMotion, pages, goTo]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries we serve"
      className="w-full max-w-6xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-live={paused ? "polite" : "off"}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INDUSTRIES.map((item, i) => {
          const gold = i % 2 === 0;
          return (
            <article
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${INDUSTRIES.length}`}
              className={`group flex shrink-0 grow-0 basis-full snap-start flex-col items-center justify-center rounded-lg border-2 p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:basis-[calc(50%_-_0.5rem)] lg:basis-[calc((100%_-_2rem)/3)] ${
                gold
                  ? "border-white bg-[#c9a227] hover:bg-[#1F3A12]"
                  : "border-[#c9a227] bg-[#1F3A12] hover:bg-[#c9a227]"
              }`}
            >
              <span className="mb-2 text-sm font-semibold opacity-70">0{i + 1}</span>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <span className="mb-3 h-0.5 w-8 bg-white transition-all duration-300 group-hover:w-16" />
              <p className="text-center text-sm">{item.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <Arrow dir="prev" onClick={() => goTo(active === 0 ? pages - 1 : active - 1)} />
        <div className="flex items-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#c9a227]" : "w-2.5 bg-[#1F3A12]/30 hover:bg-[#1F3A12]/60"
              }`}
            />
          ))}
        </div>
        <Arrow dir="next" onClick={() => goTo((active + 1) % pages)} />
      </div>
    </div>
  );
}
