import { memo, useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

const CONTACT = {
  name: "Geoffrey Emung'at",
  phone: "+254 722 800 705",
  phoneHref: "tel:+254722800705",
  whatsappHref: "https://wa.me/254722800705",
  email: "info@globalconcepts.co.ke",
  office: "Nairobi, Kenya",
};

const SERVICES = [
  "Warehouse Setup",
  "Warehousing Solutions",
  "Training",
  "Inventory Management",
  "WMS Alignment",
  "SOP Development & Training",
  "Demand Planning",
];

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32390060008!2d36.68257628838811!3d-1.3032035597181237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1793353510696!5m2!1sen!2ske";

const INITIAL = { name: "", company: "", role: "", email: "", service: SERVICES[0], message: "" };

const inputClass =
  "w-full rounded border border-[#1F3A12]/30 bg-white px-3 py-2.5 text-[#1F3A12] placeholder:text-gray-400 transition duration-300 hover:border-[#C9A227] focus:border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40";

// ---- Small pieces ---------------------------------------------------------
function Field({ label, id, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

function Icon({ d }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1F3A12] text-[#C9A227] transition-colors duration-300 group-hover:bg-[#C9A227] group-hover:text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </span>
  );
}

function DetailRow({ icon, label, children, href, external }) {
  const content = (
    <>
      <Icon d={icon} />
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide text-[#C9A227]">{label}</span>
        <span className="block break-words">{children}</span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-4";
  return href ? (
    <a href={href} className={`${cls} hover:text-[#C9A227]`} {...(external && { target: "_blank", rel: "noreferrer" })}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  );
}

function FormFields({ form, update, onFocus }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" id="name">
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={update} onFocus={onFocus} className={inputClass} />
        </Field>
        <Field label="Company" id="company">
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your company" value={form.company} onChange={update} onFocus={onFocus} className={inputClass} />
        </Field>
        <Field label="Your role" id="role">
          <input id="role" name="role" type="text" autoComplete="organization-title" placeholder="Operations manager" value={form.role} onChange={update} onFocus={onFocus} className={inputClass} />
        </Field>
        <Field label="Email" id="email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={update} onFocus={onFocus} className={inputClass} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Service of interest" id="service">
          <div className="relative">
            <select id="service" name="service" value={form.service} onChange={update} onFocus={onFocus} className={`${inputClass} cursor-pointer appearance-none pr-10`}>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1F3A12]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </Field>
        <Field label="How can we help you?" id="message">
          <textarea id="message" name="message" rows={5} required placeholder="Tell us about your operation and what you want to improve" value={form.message} onChange={update} onFocus={onFocus} className={`${inputClass} resize-y`} />
        </Field>
      </div>
    </>
  );
}

function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false); // modal mounted
  const [shown, setShown] = useState(false); // modal animated in

  const formRef = useRef(null);
  const heightRef = useRef(null);
  const pendingField = useRef(null);
  const closeTimer = useRef(null);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const openModal = useCallback((field = "name") => {
    clearTimeout(closeTimer.current);
    heightRef.current = formRef.current?.offsetHeight ?? null;
    pendingField.current = field;
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setShown(false);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setShown(true));
    if (pendingField.current) {
      document.getElementById(pendingField.current)?.focus({ preventScroll: true });
      pendingField.current = null;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Role: ${form.role}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Consultation request: ${form.service}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="pt-32 text-[#1F3A12]">
      <section className="bg-gradient-to-br from-[#1F3A12] to-[#35582A] px-4 py-16 text-center md:px-32 md:text-left">
        <Reveal>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Request a consultation</h1>
          <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-16 rounded bg-[#C9A227] md:mx-0" />
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-5 max-w-2xl text-lg text-[#dde5d0]">
            Tell us about your warehouse, inventory or training needs and we will get back to you.
          </p>
        </Reveal>
      </section>

      <section id="textme" className="bg-gray-100 px-4 py-14 md:px-12 lg:px-32">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <Reveal from="left" className="lg:col-span-3">
            {open ? (
              <div
                aria-hidden="true"
                className="rounded-lg border-t-4 border-[#C9A227] bg-white opacity-60 shadow-md"
                style={{ height: heightRef.current || undefined, minHeight: "20rem" }}
              />
            ) : (
              <form
                ref={formRef}
                onSubmit={(e) => e.preventDefault()}
                className="rounded-lg border-t-4 border-[#C9A227] bg-white p-6 shadow-md md:p-8"
              >
                <FormFields form={form} update={update} onFocus={(e) => openModal(e.target.name)} />
                <button
                  type="button"
                  onClick={() => openModal("name")}
                  className="mt-6 w-full rounded bg-[#1F3A12] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A227] hover:shadow-lg sm:w-auto"
                >
                  Send request
                </button>
              </form>
            )}
          </Reveal>

          <Reveal from="right" delay={150} className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-[#C9A227]">Contact details</h2>
              <p className="mt-1 font-semibold">{CONTACT.name}</p>
              <div className="mt-5 flex flex-col gap-5">
                <DetailRow label="Phone" href={CONTACT.phoneHref} icon="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z">
                  {CONTACT.phone}
                </DetailRow>
                <DetailRow label="Email" href={`mailto:${CONTACT.email}`} icon="M3 6h18v12H3zM3 7l9 6 9-6">
                  {CONTACT.email}
                </DetailRow>
                <DetailRow label="WhatsApp" href={CONTACT.whatsappHref} external icon="M21 12a8 8 0 01-11.8 7L4 20l1.1-4.9A8 8 0 1121 12z">
                  Message us on WhatsApp
                </DetailRow>
                <DetailRow label="Office" icon="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z">
                  {CONTACT.office}
                </DetailRow>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe
                title="Map showing our location in Nairobi"
                src={MAP_SRC}
                className="aspect-[4/3] w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6">
            <div
              aria-hidden="true"
              onClick={closeModal}
              className={`absolute inset-0 bg-[#1F3A12]/40 backdrop-blur-sm transition-opacity duration-300 ${
                shown ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="consult-title"
              className={`relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-t-4 border-[#C9A227] bg-white p-6 text-[#1F3A12] shadow-2xl shadow-[#1F3A12]/30 transition-all duration-300 ease-out md:p-8 ${
                shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close form"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-[#1F3A12]/70 transition-colors hover:bg-[#1F3A12]/10 hover:text-[#1F3A12] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <h2 id="consult-title" className="pr-10 text-2xl font-bold">
                Request a consultation
              </h2>
              <span aria-hidden="true" className="mt-2 block h-1 w-12 rounded bg-[#C9A227]" />
              <p className="mt-3 text-sm text-[#1F3A12]/70">
                Share a few details and we will get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <FormFields form={form} update={update} />

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded px-5 py-3 font-semibold text-[#1F3A12]/70 transition-colors hover:bg-[#1F3A12]/10 hover:text-[#1F3A12]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-[#1F3A12] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A227] hover:shadow-lg"
                  >
                    Send request
                  </button>
                </div>

                {sent && (
                  <p role="status" className="mt-4 rounded-lg bg-[#1F3A12]/5 p-3 text-sm text-[#35582A]">
                    Your email app should have opened with the request ready to send. If it didn't, email us at {CONTACT.email}.
                  </p>
                )}
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default memo(Contact);