"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-burgundy-dark/90 backdrop-blur">
      <div className="container-lux flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-cream/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            className="btn-ghost !py-2 !px-5 text-xs"
          >
            My Account
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-cream md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-gold/20 bg-burgundy-dark px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-cream/80 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="btn-gold w-max text-xs"
            >
              My Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
