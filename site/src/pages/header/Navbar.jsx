import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Industries", href: "industries" },
    { name: "Services", href: "services" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <nav className="fixed top-0 start-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="grid justify-items-center">
          <img
            src="/logo.webp"
            className="h-12 w-auto object-contain md:h-16"
            alt="Global Concepts"
          />
          {/* Company Name */}
          <span className="ml-2 text-sm font-bold text-gray-800">
            Global Concepts
          </span>
        </a>

        {/* Action buttons and mobile menu toggle */}
        <div className="flex items-center gap-3 md:order-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F3A12] md:hidden"
            aria-controls="navbar-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links */}
        <div
          id="navbar-menu"
          className={`${
            isOpen ? "flex" : "hidden"
          } w-full flex-col md:order-1 md:flex md:w-auto md:flex-row md:items-center`}
        >
          <ul className="mt-4 flex flex-col gap-1 rounded-lg border border-gray-100 bg-white p-3 font-medium md:mt-0 md:flex-row md:gap-8 md:border-0 md:p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-[#1F3A12] md:px-0 md:py-2 md:hover:bg-transparent"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Consultation button */}
          <a
            href="#consultation"
            onClick={() => setIsOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-md bg-[#1F3A12] px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#304F20] md:ml-8 md:mt-0"
          >
            Request a Consultation
          </a>
        </div>
      </div>
    </nav>
  );
}
