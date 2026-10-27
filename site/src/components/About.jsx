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

// Files in /public are served from the site root, so don't prefix "public/".
// Tip: rename the file to "global-concepts-logo.mp4" to avoid spaces in the URL.
const VIDEO_SRC = encodeURI("GlobalConceptsLogoVideo.mp4");

function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center overflow-x-clip bg-gray-100 px-4 pt-16 text-center text-[#1F3A12]"
    >
      {/* Intro */}
      <Reveal
        as="header"
        className="flex max-w-prose flex-col items-center md:max-w-3xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-[#1F3A12] md:text-4xl">
          Learn how we help businesses
        </h1>
        <span
          aria-hidden="true"
          className="mb-6 h-1 w-16 rounded bg-[#C9A227]"
        />
        <p className="md:text-left">{INTRO}</p>
      </Reveal>

      {/* Video + mission */}
      <div className="mt-10 flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-center">
        <Reveal from="left" className="flex w-full justify-center md:w-1/2">
          <AutoplayVideo
            src={VIDEO_SRC}
            className="h-auto w-3/4 rounded-lg  transition-transform duration-500 hover:scale-[1.03]"
          />
        </Reveal>

        <Reveal
          from="right"
          delay={150}
          className="w-full md:w-2/5 md:text-left"
        >
          {/* h2: the page already has one h1 */}
          <h2 className="mb-4 text-2xl font-bold text-[#c9a227] md:text-3xl">
            {HEADLINE}
          </h2>
          <p>{MISSION}</p>
          <Link
            to="/about"
            className="mt-4 inline-block rounded bg-[#1f3a12] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#c9a227]"
          >
            Learn More
          </Link>
        </Reveal>
      </div>

      {/* Industries */}
      <div className="mt-16 flex border-t border-[#C9A227] w-full flex-col items-center gap-2 py-6">
        <Reveal className="flex flex-col items-center gap-2">
          <h2 className="text-4xl font-bold">The Industries We Serve</h2>
          <p className="max-w-xl">
            We specialize in helping businesses across various industries
            optimize their supply chains.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-4 flex w-full justify-center">
          <IndustriesSlider />
        </Reveal>
      </div>

      {/* Call to action */}
      <Reveal
        from="zoom"
        className="m-4 mb-10 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#1F3A12] px-4 py-10 text-white md:w-1/2"
      >
        <h2 className="text-xl font-bold">Ready for a smarter supply chain?</h2>
        <p>Tell us about your operation and we will show you where to start.</p>
        <Link
          to="/contact"
          className="rounded bg-[#c9a227] px-5 py-2.5 font-semibold text-[#1F3A12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
        >
          Request a Consultation
        </Link>
      </Reveal>
    </section>
  );
}

// No props or state, so memo lets React skip re-rendering when a parent updates.
export default memo(About);
