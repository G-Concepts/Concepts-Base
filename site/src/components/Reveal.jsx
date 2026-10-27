import { useEffect, useRef, useState } from "react";

// Full class strings (not built dynamically) so Tailwind can detect them.
const HIDDEN_FROM = {
  up: "motion-safe:translate-y-8",
  left: "motion-safe:-translate-x-10",
  right: "motion-safe:translate-x-10",
  zoom: "motion-safe:scale-95",
  none: "",
};

/**
 * Fades/slides its children in once, when they scroll into view.
 * Users with "reduce motion" enabled just see the content immediately.
 *
 * <Reveal from="left" delay={150}>...</Reveal>
 */
export default function Reveal({
  as: Tag = "div",
  from = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // animate once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const state = shown
    ? "opacity-100 translate-x-0 translate-y-0 scale-100"
    : `motion-safe:opacity-0 ${HIDDEN_FROM[from]}`;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${state} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
