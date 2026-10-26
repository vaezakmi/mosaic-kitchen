import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useOpenStatus } from "@/hooks/useOpenStatus";

const LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, label } = useOpenStatus();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[rgba(242,240,228,0.08)] bg-[rgba(11,14,12,0.72)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            to="/"
            className="font-display text-[1.55rem] font-light leading-none tracking-tight text-[#f2f0e4] no-underline"
            aria-label="Mosaic Kitchen — home"
          >
            Mosaic<span className="italic text-[#e8a33d]">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <span className="hidden items-center gap-2 rounded-full border border-[rgba(242,240,228,0.12)] px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-[#b9bcae] md:inline-flex">
              <span className={`status-dot ${open ? "" : "closed"}`} aria-hidden />
              {label}
            </span>
            <Link to="/reserve" className="btn-primary hidden !min-h-[42px] !px-5 !text-[0.85rem] sm:inline-flex">
              Reserve
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-[rgba(242,240,228,0.15)] bg-transparent transition-colors hover:border-[#e8a33d] lg:hidden"
            >
              <span
                className={`block h-px w-5 bg-[#f2f0e4] transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#f2f0e4] transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu (mobile / tablet) */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#0b0e0c] px-6 pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-2" aria-label="Overlay">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) =>
                `font-display text-[13vw] font-light leading-[1.12] tracking-tight transition-all duration-500 sm:text-6xl ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${isActive ? "italic text-[#e8a33d]" : "text-[#f2f0e4]"}`
              }
              style={{ transitionDelay: `${i * 60 + 100}ms` }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <Link to="/reserve" tabIndex={menuOpen ? 0 : -1} className="btn-primary w-full">
            Reserve a table
          </Link>
          <p className="text-center text-xs tracking-[0.25em] text-[#b9bcae] uppercase">
            George Padmore Rd · Kilimani
          </p>
        </div>
      </div>
    </>
  );
}
