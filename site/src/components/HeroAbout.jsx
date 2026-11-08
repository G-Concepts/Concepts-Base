import { memo } from "react";
import { Link } from "react-router-dom";
import AutoplayVideo from "./AutoplayVideo";
import IndustriesSlider from "./IndustriesSlider";
import Reveal from "./Reveal";

// Static content lives outside the component: created once, not on every render.
const INTRO =
  "Global Concepts Consultancy is a supply chain management consultancy serving East Africa. We combine technical expertise with hands-on operational experience to develop solutions tailored to each client's needs, from warehouse setup and inventory management to demand planning, SOPs and training.";
const HEADLINE =
  "Practical supply chain expertise. Smarter operations. Measurable results.";
const MISSION =
  "Our mission is to transform supply chains into efficient, cost-effective and customer-focused systems that enable sustainable business growth.";

const SERVICES = [
  "Warehouse Setup",
  "Warehousing Solutions",
  "Training",
  "Inventory Management",
  "WMS Alignment",
  "SOP Development & Training",
  "Demand Planning",
];

// Files in /public are served from the site root, so don't prefix "public/".
// Tip: rename the file to "global-concepts-logo.mp4" to avoid spaces in the URL.
const VIDEO_SRC = encodeURI("GlobalConceptsLogoVideo.mp4");

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

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-[#C9A227]"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function About() {
  return (
    <section
      id="about"
      className="overflow-x-clip text-sm text-[#1F3A12]"
    >
      {/* Intro + services */}
      <div className="bg-gray-100 px-4 pb-14 pt-16 md:pb-16 md:pt-20">
        <Reveal
          as="header"
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-4 rounded-full border border-[#C9A227]/50 bg-white px-3 py-1 text-xs font-semibold text-[#8a6f12]">
            About Global Concepts
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Learn how we help businesses
          </h1>
          <span
            aria-hidden="true"
            className="mb-5 mt-3 h-1 w-16 rounded bg-[#C9A227]"
          />
          <p className="leading-relaxed text-[#1F3A12]/80">{INTRO}</p>
        </Reveal>

        <Reveal delay={150} className="mx-auto mt-8 max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {SERVICES.map((s) => (
              <li
                key={s}
                className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium shadow-sm ring-1 ring-[#1F3A12]/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-[#C9A227]/60"
              >
                <Check />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Video + mission */}
      <div className="bg-white px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal from="left" className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Offset gold frame behind the video */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-1 border-[#C9A227]/60"
              />
              <div className="relative rounded-2xl bg-white p-3 shadow-xl shadow-[#1F3A12]/10 ring-1 ring-[#1F3A12]/10">
                <AutoplayVideo
                  src={VIDEO_SRC}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={150} className="text-center md:text-left">
            <span className="text-xs font-semibold text-[#8a6f12]">
              Our mission
            </span>
            {/* h2: the page already has one h1 */}
            <h2 className="mt-2 text-2xl font-bold leading-snug md:text-3xl">
              {HEADLINE}
            </h2>
            <p className="mt-4 border-[#C9A227] leading-relaxed text-[#1F3A12]/80 md:border-l-4 md:pl-4">
              {MISSION}
            </p>
            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F3A12] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A227] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2"
            >
              Learn More
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Industries */}
      <div className="bg-gray-100 px-4 py-14 md:py-20">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            The Industries We Serve
          </h2>
          <span
            aria-hidden="true"
            className="mb-4 mt-3 h-1 w-16 rounded bg-[#C9A227]"
          />
          <p className="leading-relaxed text-[#1F3A12]/80">
            We specialize in helping businesses across various industries
            optimize their supply chains.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex w-full justify-center">
          <IndustriesSlider />
        </Reveal>
      </div>

      {/* Call to action */}
      <div className="bg-white px-4 py-14 md:py-20">
        <Reveal
          from="zoom"
          className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-6 py-12 text-center text-white shadow-xl shadow-[#1F3A12]/20"
        >
          {/* Soft decorative glows */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A227]/25 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl"
          />

          <h2 className="relative text-xl font-bold md:text-2xl">
            Ready for a smarter supply chain?
          </h2>
          <p className="relative max-w-md leading-relaxed text-[#dde5d0]">
            Tell us about your operation and we will show you where to start.
          </p>
          <Link
            to="/contact"
            className="group relative mt-2 inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#1F3A12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3A12]"
          >
            Request a Consultation
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// No props or state, so memo lets React skip re-rendering when a parent updates.
export default memo(About);