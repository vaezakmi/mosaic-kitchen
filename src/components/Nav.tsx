
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useOpenStatus } from "@/hooks/useOpenStatus";

const LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

function MosaicBrand({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Mosaic Kitchen — home"
      className={`group inline-flex shrink-0 items-center ${
        mobile ? "mb-8" : ""
      }`}
    >
      <img
        src="/images/mosaic-logo.jpg"
        alt="Mosaic Kitchen"
        className={`block h-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-[1.03] ${
          mobile
            ? "w-[155px] sm:w-[175px]"
            : "w-[105px] sm:w-[125px] lg:w-[140px]"
        }`}
        fetchPriority="high"
      />
    </Link>
  );
}

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[rgba(242,240,228,0.09)] bg-[rgba(11,14,12,0.88)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            : "bg-gradient-to-b from-[rgba(11,14,12,0.45)] to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-4 px-5 md:h-[88px] md:px-10">
          {/* Actual Mosaic logo */}
          <MosaicBrand />

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-7 lg:flex xl:gap-9"
            aria-label="Primary navigation"
          >
            {LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link relative transition-colors duration-300 ${
                    isActive ? "active text-[#e8a33d]" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <div className="hidden items-center gap-2.5 rounded-full border border-[rgba(242,240,228,0.12)] bg-[rgba(11,14,12,0.18)] px-3.5 py-2 text-[0.72rem] font-medium tracking-wide text-[#d6d8cc] xl:inline-flex">
              <span
                className={`status-dot ${open ? "" : "closed"}`}
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>

            <Link
              to="/reserve"
              className="btn-primary hidden !min-h-[42px] !px-5 !text-[0.85rem] sm:inline-flex"
            >
              Reserve a table
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[6px] rounded-full border border-[rgba(242,240,228,0.18)] bg-[rgba(11,14,12,0.35)] transition-colors duration-300 hover:border-[#e8a33d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a33d] lg:hidden"
            >
              <span
                className={`block h-px w-5 bg-[#f2f0e4] transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#f2f0e4] transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile navigation */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#0b0e0c] px-6 pb-8 pt-28 transition-[opacity,visibility] duration-400 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div>
          <MosaicBrand mobile />

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {LINKS.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                tabIndex={menuOpen ? 0 : -1}
                className={({ isActive }) =>
                  `group flex items-center justify-between border-b border-white/[0.08] py-3 font-display text-[clamp(2.8rem,11vw,4.8rem)] font-light leading-[1.12] tracking-tight transition-all duration-500 ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${
                    isActive
                      ? "italic text-[#e8a33d]"
                      : "text-[#f2f0e4] hover:text-[#e8a33d]"
                  }`
                }
                style={{
                  transitionDelay: menuOpen ? `${index * 65 + 80}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="text-2xl not-italic text-[#e8a33d] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  ↗
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/[0.09] pt-6">
          <div className="mb-6 flex items-center justify-between text-sm text-[#b9bcae]">
            <span className="flex items-center gap-2">
              <span
                className={`status-dot ${open ? "" : "closed"}`}
                aria-hidden="true"
              />
              {label}
            </span>

            <span className="text-xs tracking-[0.12em] uppercase">
              Kilimani, Nairobi
            </span>
          </div>

          <Link
            to="/reserve"
            tabIndex={menuOpen ? 0 : -1}
            className="btn-primary flex w-full items-center justify-center gap-3 !py-4"
          >
            Reserve your table
          </Link>

          <p className="mt-5 text-center text-[0.65rem] tracking-[0.22em] text-[#777d70] uppercase">
            George Padmore Road · Nairobi
          </p>
        </div>
      </div>
    </>
  );
}
