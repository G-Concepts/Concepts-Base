import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

// ---- Content (module scope: created once, easy to edit) -------------------
const INTRO =
  "A supply chain consultancy that pairs technical expertise with hands-on operational experience to deliver practical, measurable results for businesses across East Africa.";

// Icon paths are 24x24 stroke icons.
const PILLARS = [
  {
    title: "Our mission",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 12h.01",
    text: "To transform supply chains into efficient, cost-effective and customer-focused systems that enable sustainable business growth.",
  },
  {
    title: "Our vision",
    icon: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
    text: "To be the leading supply chain consultancy in East Africa, empowering businesses with innovative, efficient and sustainable solutions that drive growth, resilience and customer satisfaction.",
  },
];

const STEPS = [
  { title: "Assess", text: "We study your operation, data and pain points on site." },
  { title: "Design", text: "We build a solution tailored to your space, stock and people." },
  { title: "Implement", text: "We work alongside your team to put it in place." },
  { title: "Train", text: "We equip staff with SOPs and best practices." },
  { title: "Measure", text: "We track results against agreed targets." },
];

const LEADER = {
  name: "Geoffrey Emung'at",
  role: "Logistics and Supply Chain Consultant",
  photo: "Geoffrey_Emungat.webp",
  bio: "Geoffrey Emung'at is a seasoned logistics and supply chain consultant with over 15 years of experience in the industry. He has worked with numerous multinational companies, helping them optimize their supply chain operations and improve efficiency. Geoffrey is passionate about leveraging technology and innovative strategies to drive business growth and success.",
  highlights: ["15+ years of experience", "Multinational clients"],
};

// ---- Small pieces ---------------------------------------------------------
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

function Portrait({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="group relative mx-auto w-64 shrink-0 md:w-72">
      {/* offset gold frame that slides out on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-[#C9A227]/70 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"
      />
      {failed ? (
        <div className="relative grid aspect-[4/5] place-items-center rounded-2xl bg-[#1F3A12] text-5xl font-bold text-[#C9A227]">
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={`Portrait of ${name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl shadow-[#1F3A12]/20 ring-1 ring-[#1F3A12]/10"
        />
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, children }) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      {eyebrow && (
        <span className="mb-3 rounded-full border border-[#C9A227]/50 bg-white px-3 py-1 text-xs font-semibold text-[#8a6f12]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>
      <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded bg-[#C9A227]" />
    </div>
  );
}

// ---- Page -----------------------------------------------------------------
function AboutPage() {
  return (
    <div className="pt-32 text-sm text-[#1F3A12]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:py-20 md:text-left">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-[#C9A227]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#dde5d0]">
              <Link to="/" className="transition-colors hover:text-[#C9A227]">Home</Link>
              <span aria-hidden="true" className="mx-2 opacity-60">/</span>
              <span aria-current="page" className="font-semibold text-white">About</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              About Global Concepts Consultancy
            </h1>
            <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-[#C9A227] md:mx-0" />
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#dde5d0] md:text-base">
              {INTRO}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="grid gap-6 px-4 py-14 md:grid-cols-2 md:px-32">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} from={i === 0 ? "left" : "right"}>
            <article className="h-full rounded-lg border-t-4 border-[#C9A227] bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-[#C9A227]">{p.title}</h2>
              <p className="mt-3">{p.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* How we work */}
      <section className="bg-gray-100 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle eyebrow="Our process">How we work</SectionTitle>
          </Reveal>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="list-none">
                <div className="group h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#1F3A12]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#C9A227]/60">
                  <div className="mb-4 flex items-center">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1F3A12] font-bold text-[#C9A227] transition-colors duration-300 group-hover:bg-[#C9A227] group-hover:text-[#1F3A12]">
                      {i + 1}
                    </span>
                    {/* connector to the next step */}
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="ml-3 hidden h-px flex-1 bg-gradient-to-r from-[#C9A227] to-transparent lg:block"
                      />
                    )}
                  </div>
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-[#1F3A12]/75">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leader */}
      <section className="bg-white px-4 py-14 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 md:flex-row">
          <Reveal from="left">
            <Portrait src={LEADER.photo} name={LEADER.name} />
          </Reveal>
          <Reveal from="right" delay={150} className="max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold text-[#8a6f12]">Meet our lead consultant</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{LEADER.name}</h2>
            <p className="mt-1 font-semibold text-[#35582A]">{LEADER.role}</p>
            <span aria-hidden="true" className="mx-auto my-4 block h-1 w-12 rounded bg-[#C9A227] md:mx-0" />
            <p className="leading-relaxed text-[#1F3A12]/80">{LEADER.bio}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {LEADER.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full bg-gray-100 px-3.5 py-1.5 text-xs font-medium ring-1 ring-[#1F3A12]/10"
                >
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gray-100 px-4 py-14 md:py-20">
        <Reveal
          from="zoom"
          className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-6 py-12 text-center text-white shadow-xl shadow-[#1F3A12]/20"
        >
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A227]/25 blur-2xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-2xl font-bold md:text-3xl">Let's improve your supply chain</h2>
          <p className="relative max-w-2xl leading-relaxed text-[#dde5d0]">
            We are here to help you optimize your supply chain and achieve your business goals. Contact us today to learn more about our services and how we can support your organization.
          </p>
          <Link
            to="/contact"
            className="group relative mt-2 inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#1F3A12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3A12]"
          >
            Request a Consultation
            <Arrow />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

export default memo(AboutPage);