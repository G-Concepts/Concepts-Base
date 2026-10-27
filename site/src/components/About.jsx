import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
// ---- Content (module scope: created once, easy to edit) -------------------
const INTRO =
  "A supply chain consultancy that pairs technical expertise with hands-on operational experience to deliver practical, measurable results for businesses across East Africa.";

const PILLARS = [
  {
    title: "Our mission",
    text: "To transform supply chains into efficient, cost-effective and customer-focused systems that enable sustainable business growth.",
  },
  {
    title: "Our vision",
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
};

function Portrait({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="group relative mx-auto w-64 shrink-0 md:w-72">
      {/* offset gold frame that slides out on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-[#C9A227] transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"
      />
      {failed ? (
        <div className="relative grid aspect-[4/5] place-items-center rounded-lg bg-[#1F3A12] text-5xl font-bold text-[#C9A227]">
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={`Portrait of ${name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-lg"
        />
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#C9A227] md:text-3xl">{children}</h2>
      <span aria-hidden="true" className="mt-2 block h-1 w-12 rounded bg-[#1F3A12]" />
    </div>
  );
}

// ---- Page -----------------------------------------------------------------
function About() {
  return (
    <div className="pt-32 text-[#1F3A12]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:px-32 md:text-left">
        <Reveal>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            About Global Concepts Consultancy
          </h1>
          <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-[#C9A227] md:mx-0" />
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-5 max-w-2xl text-lg text-[#dde5d0]">{INTRO}</p>
        </Reveal>
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
      <section className="bg-gray-100 px-4 py-14 md:px-32">
        <Reveal>
          <SectionTitle>How we work</SectionTitle>
        </Reveal>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100} className="list-none">
              <div className="group h-full rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#1F3A12] font-bold text-[#C9A227] transition-colors duration-300 group-hover:bg-[#C9A227] group-hover:text-white">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Leader */}
      <section className="flex flex-col items-center justify-center gap-10 px-4 py-16 md:flex-row md:px-32">
        <Reveal from="left">
          <Portrait src={LEADER.photo} name={LEADER.name} />
        </Reveal>
        <Reveal from="right" delay={150} className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#C9A227] md:text-3xl">{LEADER.name}</h2>
          <p className="mt-1 font-semibold">{LEADER.role}</p>
          <p className="mt-4 text-sm leading-relaxed md:text-base">{LEADER.bio}</p>
        </Reveal>
      </section>

      {/* Call to action */}
      <section className="bg-[#1F3A12] px-4 py-16 text-center text-white md:px-32">
        <Reveal from="zoom">
          <h2 className="text-3xl font-bold">Let's improve your supply chain</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#dde5d0]">
            We are here to help you optimize your supply chain and achieve your business goals. Contact us today to learn more about our services and how we can support your organization.
          </p>
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

export default memo(About);