import { memo } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const SERVICES = [
  {
    slug: "warehouse-setup",
    title: "Warehouse Setup",
    text: "Designing efficient layouts, storage systems and workflows that maximise space utilisation, streamline operations and reduce handling times.",
  },
  {
    slug: "warehousing-solutions",
    title: "Warehousing Solutions",
    text: "End-to-end warehousing support, including storage optimisation, process improvement, operational planning and scalable solutions.",
  },
  {
    slug: "training",
    title: "Training",
    text: "Customised programmes to upskill staff with best practices, improving productivity and reducing errors.",
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    text: "Strategies to enhance stock visibility, improve accuracy, reduce holding costs and ensure timely replenishment.",
  },
  {
    slug: "wms-alignment",
    title: "WMS Alignment",
    text: "Assessment and customisation of WMS solutions to align with operational needs for seamless tracking and reporting.",
  },
  {
    slug: "sop-development",
    title: "SOP Development & Training",
    text: "Tailored SOPs and trained teams for standardised, compliant and consistent performance.",
  },
  {
    slug: "demand-planning",
    title: "Demand Planning",
    text: "Forecasting and planning solutions that balance supply with demand, reducing stockouts and overstocks.",
  },
];

function ServicesOverview() {
  return (
    <div className="pt-32 text-[#1F3A12]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:px-32 md:text-left">
        <Reveal>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Our services</h1>
          <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-[#C9A227] md:mx-0" />
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-5 max-w-2xl text-lg text-[#dde5d0]">
            We offer a range of services designed to optimize your supply chain and drive business growth. Seven services cover the warehouse, the stock and the people who run them.
          </p>
        </Reveal>
      </section>

      {/* Services list */}
      <section className="px-4 py-12 md:px-32">
        <ul className="space-y-4">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 80} className="list-none">
              <Link
                // to={`/services/${s.slug}`}
                to=""
                className="group flex flex-col gap-3 rounded-lg border border-[#C9A227] bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#1F3A12] hover:text-white hover:shadow-xl md:flex-row md:items-center md:gap-6"
              >
                <span className="text-sm font-bold text-[#C9A227]">0{i + 1}</span>
                <h2 className="text-lg font-semibold md:w-1/4">{s.title}</h2>
                <p className="text-sm md:flex-1">{s.text}</p>
                <span className="flex items-center gap-2 font-semibold text-[#C9A227] md:justify-end">
                  Learn more
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Call to action */}
      <section className="bg-[#1F3A12] px-4 py-16 text-center text-white md:px-32">
        <Reveal from="zoom">
          <h2 className="text-3xl font-bold">Which service fits your operation?</h2>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[#1F3A12] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
          >
            Request a Consultation
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

export default memo(ServicesOverview);