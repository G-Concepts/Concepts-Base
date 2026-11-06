import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState("/");

  // Current path for the active-link highlight
  useEffect(() => {
    setPath(window.location.pathname.replace(/\/$/, "") || "/");
  }, []);

  // Navbar tightens up once the page starts scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape, and lock page scroll while it's open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href) => path === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      {/* Mask: solid page color behind the bar, fading out just below it,
          so scrolling content never shows above or around the navbar.
          Change the white values if your page background isn't white. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-5 top-0"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #ffffff 80%, rgba(255,255,255,0) 100%)",
        }}
      />

      <nav
        aria-label="Main"
        className={`relative mx-auto max-w-screen-xl rounded-2xl border bg-white transition-all duration-300 ${
          scrolled
            ? "border-[#1F3A12]/15 shadow-lg shadow-[#1F3A12]/10"
            : "border-gray-200 shadow-sm"
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 transition-all duration-300 md:px-5 ${
            scrolled ? "py-1.5" : "py-2.5"
          }`}
        >
          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A12]"
          >
            <div className="flex flex-col items-center">
              <img
                src="/logo.webp"
                alt="Global Concepts logo"
                className={`w-auto rounded-lg object-contain mix-blend-multiply transition-all duration-300 ${
                  scrolled ? "h-15" : "h-20"
                }`}
              />
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A12] ${
                    isActive(link.href)
                      ? "bg-[#1F3A12]/10 text-[#1F3A12]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/contact#textme"
              className="hidden rounded-full bg-[#1F3A12] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-[#304F20] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A12] focus-visible:ring-offset-2 md:inline-flex"
            >
              Request a consultation
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3A12] md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {/* Hamburger that morphs into an X */}
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu: animates height smoothly */}
        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1 border-t border-gray-100 px-3 pb-3 pt-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-[#1F3A12]/10 text-[#1F3A12]"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/contact#textme"
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                  className="flex items-center justify-center rounded-xl bg-[#1F3A12] px-4 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#304F20]"
                >
                  Request a consultation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}