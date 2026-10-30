import { memo } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const HERO = {
  title: "Warehouse Setup",
  text: "Efficient layouts, storage systems and workflows that maximise space and cut handling times.",
  image: "/Modern Warehouse Inventory Operations.webp",
};

const OVERVIEW = [
  {
    title: "The challenge",
    text: "Congested aisles, long pick paths, poorly used space and slow receiving and dispatch.",
  },
  {
    title: "What we do",
    text: "We design the layout, storage systems and workflows around your products, volumes and people, so space is used fully and goods move faster.",
  },
];

const OUTCOMES = [
  {
    title: "What you receive",
    items: [
      "Warehouse layout plan",
      "Storage and racking recommendations",
      "Process and flow design",
      "Implementation support",
    ],
  },
  {
    title: "Results to expect",
    items: ["Better space utilisation", "Streamlined operations", "Reduced handling times"],
  },
];

// Add "Warehouse Audits" back here only if the client offers it.
const RELATED = [
  { title: "Inventory Management", to: "/services/inventory-management" },
  { title: "SOP Development & Training", to: "/services/sop-development" },
  { title: "WMS Alignment", to: "/services/wms-alignment" },
  { title: "Warehousing Solutions", to: "/services/warehousing-solutions" },
];

// ---- Small pieces ---------------------------------------------------------
const buttonBase =
  "inline-block rounded bg-[#C9A227] font-bold text-[#1F3A12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg";

function CheckList({ items }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg className="mt-1 h-4 w-4 shrink-0 text-[#C9A227]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Card({ title, accent, children }) {
  return (
    <article className={`h-full rounded-lg border-t-4 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent}`}>
      <h2 className="text-2xl font-bold text-[#C9A227]">{title}</h2>
      {children}
    </article>
  );
}

// ---- Page -----------------------------------------------------------------
function Services() {
  return (
    <div className="pt-32 text-[#1F3A12]">
      {/* Hero */}
      <section className="items-center gap-8 bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:flex md:px-32 md:text-left">
        <div className="md:w-1/2">
          <Reveal>
            <p className="text-sm text-[#C9A227]">
              <Link to="/services" className="hover:underline">Services</Link> / {HERO.title}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-white md:text-4xl">{HERO.title}</h1>
            <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-[#C9A227] md:mx-0" />
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-2xl text-lg text-[#dde5d0]">{HERO.text}</p>
            <Link to="/contact" className={`${buttonBase} mt-6 px-5 py-2.5`}>
              Discuss your warehouse
            </Link>
          </Reveal>
        </div>
        <Reveal from="right" delay={200} className="mt-10 md:mt-0 md:w-1/2">
          <img
            src={encodeURI(HERO.image)}
            alt="Modern warehouse with organised racking and inventory operations"
            className="h-auto w-full rounded-lg shadow-md"
          />
        </Reveal>
      </section>

      {/* Challenge / approach */}
      <section className="grid gap-6 px-4 py-14 md:grid-cols-2 md:px-32">
        {OVERVIEW.map((p, i) => (
          <Reveal key={p.title} from={i === 0 ? "left" : "right"}>
            <Card title={p.title} accent="border-[#C9A227]">
              <p className="mt-3">{p.text}</p>
            </Card>
          </Reveal>
        ))}
      </section>

      {/* Deliverables / results */}
      <section className="grid gap-6 bg-gray-100 px-4 py-14 md:grid-cols-2 md:px-32">
        {OUTCOMES.map((p, i) => (
          <Reveal key={p.title} from={i === 0 ? "left" : "right"}>
            <Card title={p.title} accent="border-[#1F3A12]">
              <CheckList items={p.items} />
            </Card>
          </Reveal>
        ))}
      </section>

      {/* Related services */}
      <section className="px-4 py-14 md:px-32">
        <Reveal>
          <h2 className="mb-8 text-center text-2xl font-bold text-[#C9A227]">Related services</h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((r, i) => (
            <Reveal as="li" key={r.to} delay={i * 100} className="list-none">
              <Link
                to={r.to}
                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-[#C9A227] bg-white p-5 font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#1F3A12] hover:text-white hover:shadow-xl"
              >
                {r.title}
                <span aria-hidden="true" className="text-[#C9A227] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:px-32">
        <Reveal from="zoom">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Planning a new warehouse or fixing an existing one?
          </h2>
          <Link to="/contact" className={`${buttonBase} mt-6 px-6 py-3`}>
            Request a consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

export default memo(Services);