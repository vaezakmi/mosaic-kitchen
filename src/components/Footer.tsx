import { Link } from "react-router";
import { INFO } from "@/data/content";
import { useOpenStatus } from "@/hooks/useOpenStatus";

export function Footer() {
  const { open, label } = useOpenStatus();
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(242,240,228,0.08)] bg-[#080a08]">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight text-[#f2f0e4]">
              Mosaic<span className="italic text-[#e8a33d]">.</span>
            </p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-[#b9bcae]">
              African &amp; Chinese fusion, coffee by day and draft beer by night —
              in a garden hideaway in the heart of Kilimani.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(242,240,228,0.12)] px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-[#b9bcae]">
              <span className={`status-dot ${open ? "" : "closed"}`} aria-hidden />
              {label}
            </span>
          </div>

          <div>
            <p className="eyebrow mb-5">Visit</p>
            <address className="text-[0.95rem] leading-relaxed text-[#b9bcae] not-italic">
              {INFO.address[0]}
              <br />
              {INFO.address[1]}
            </address>
            <a
              className="link-arrow mt-4 text-sm"
              href={INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="eyebrow mb-4 mt-9">Hours</p>
            <p className="text-[0.95rem] text-[#b9bcae]">
              Mon – Sun · 10:00 AM – 10:00 PM
              <br />
              <span className="text-[#8a8d80]">Kitchen closes 10:00 PM</span>
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <nav className="flex flex-col gap-3" aria-label="Footer">
              {[
                { to: "/menu", label: "Menu" },
                { to: "/events", label: "Events" },
                { to: "/story", label: "Our Story" },
                { to: "/contact", label: "Contact" },
                { to: "/reserve", label: "Reserve a table" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="link-arrow w-fit text-[0.95rem]">
                  {l.label}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </nav>
            <p className="eyebrow mb-4 mt-9">Talk to us</p>
            <a href={INFO.phoneHref} className="block text-[0.95rem] text-[#b9bcae] transition-colors hover:text-[#e8a33d]">
              {INFO.phone}
            </a>
            <a href={INFO.emailHref} className="mt-1 block text-[0.95rem] text-[#b9bcae] transition-colors hover:text-[#e8a33d]">
              {INFO.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[rgba(242,240,228,0.08)] pt-8 text-xs tracking-wide text-[#8a8d80] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Mosaic Kitchen, Kilimani. All rights reserved.</p>
          <p className="tracking-[0.25em] uppercase">Coffee by day · Draft by night</p>
        </div>
      </div>

      {/* soft amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(232,163,61,0.5), transparent 65%)" }}
      />
    </footer>
  );
}
