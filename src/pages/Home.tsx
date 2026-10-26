import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GardenCanvas = lazy(() =>
  import("@/components/GardenCanvas").then((m) => ({ default: m.GardenCanvas }))
);
import { Reveal, SplitReveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { DISHES, EVENTS, INFO, REVIEWS, ksh } from "@/data/content";
import { useOpenStatus } from "@/hooks/useOpenStatus";

gsap.registerPlugin(ScrollTrigger);

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function useNairobiTime() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Nairobi",
    });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = window.setInterval(() => setTime(fmt()), 10_000);
    return () => window.clearInterval(t);
  }, []);
  return [time];
}

function NairobiClock() {
  const [time] = useNairobiTime();
  return (
    <span className="tabular-nums text-[#b9bcae]">{time}</span>
  );
}

/* ═══ Hero ═══ */
function Hero() {
  const { open, label } = useOpenStatus();
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <Suspense fallback={null}>
        <GardenCanvas />
      </Suspense>
      {/* legibility gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e0c] via-[rgba(11,14,12,0.25)] to-[rgba(11,14,12,0.35)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(11,14,12,0.55)] via-transparent to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-24 pt-40 md:px-10">
        <div className="pointer-events-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(242,240,228,0.16)] bg-[rgba(11,14,12,0.4)] px-4 py-2 backdrop-blur-md">
          <span className={`status-dot ${open ? "" : "closed"}`} aria-hidden />
          <span className="text-[0.78rem] font-medium tracking-wide text-[#e6e4d8]">{label}</span>
          <span className="hidden text-[0.78rem] text-[#8a8d80] sm:inline">·</span>
          <span className="hidden text-[0.78rem] text-[#8a8d80] sm:inline"><NairobiClock /> in Nairobi</span>
        </div>

        <h1 className="display-hero max-w-[13ch] text-[#f2f0e4]">
          <SplitReveal text="Nairobi's best kept" delay={0.1} />
          <br />
          <em className="accent">
            <SplitReveal text="garden secret." delay={0.45} />
          </em>
        </h1>

        <div className="pointer-events-auto mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-[1.02rem] leading-relaxed text-[#c9ccc0]">
            African and Chinese fusion in a Kilimani garden.
            <br />
            Coffee by day, draft beer by night.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/reserve" className="btn-primary">Reserve a table</Link>
            <Link to="/menu" className="btn-ghost">View menu</Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 md:flex" aria-hidden>
        <span className="text-[0.62rem] tracking-[0.35em] text-[#8a8d80] uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}

/* ═══ Manifesto ═══ */
function Manifesto() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div>
          <Reveal><p className="eyebrow">The Mosaic idea</p></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm leading-relaxed text-[#8a8d80]">
              George Padmore Road, Kilimani — where the bold, spicy notes of
              Chinese cuisine meet the rich, earthy flavors of African cooking.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <p className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-light leading-[1.25] tracking-tight text-[#e6e4d8]">
            The best meals are the ones that bring{" "}
            <em className="accent">different worlds</em> together — a coffee
            shop for the early risers, a draft-beer haven after dark, and a
            garden lounge for <em className="accent">everyone in between.</em>
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-y-10 border-t border-[rgba(242,240,228,0.1)] pt-10 sm:grid-cols-3 sm:gap-x-10">
        {[
          { n: INFO.rating, l: "Google rating", s: `from ${INFO.reviewCount} reviews` },
          { n: "12", l: "Fusion dishes", s: "plus a rotating specials board" },
          { n: "10–10", l: "Open every day", s: "coffee at ten, last call at ten" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1}>
            <div>
              <p className="font-display text-5xl font-light text-[#e8a33d] md:text-6xl">{s.n}</p>
              <p className="mt-2 text-sm font-medium text-[#e6e4d8]">{s.l}</p>
              <p className="text-sm text-[#8a8d80]">{s.s}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ Day → Night pinned scroll story ═══ */
function DayNight() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });
      tl.to(".dn-day-img", { opacity: 0, scale: 1.08, ease: "none" }, 0)
        .to(".dn-day-tint", { opacity: 0, ease: "none" }, 0)
        .fromTo(".dn-night-img", { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, ease: "none" }, 0)
        .to(".dn-day-copy", { opacity: 0, y: -40, ease: "none" }, 0)
        .fromTo(".dn-night-copy", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.28)
        .to(".dn-sky", { opacity: 1, ease: "none" }, 0.15);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] overflow-hidden" aria-label="From day to night at Mosaic">
      {/* night layer (base) */}
      <img src="/images/hero-garden.jpg" alt="Mosaic garden terrace at night, glowing with string lights" className="dn-night-img absolute inset-0 h-full w-full object-cover opacity-0" />
      <div aria-hidden className="absolute inset-0 bg-[#0b0e0c]/35" />
      {/* day layer */}
      <img src="/images/event-brunch.jpg" alt="Garden brunch table in morning light" className="dn-day-img absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden className="dn-day-tint absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,192,106,0.28),transparent_60%)]" />
      {/* night sky gradient sweep */}
      <div aria-hidden className="dn-sky absolute inset-0 bg-gradient-to-t from-[#0b0e0c] via-transparent to-[rgba(4,8,14,0.75)] opacity-0" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(11,14,12,0.6)] via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 md:px-10 md:pb-32">
        <div className="dn-day-copy max-w-2xl">
          <p className="eyebrow !text-[#7a6a45]">10:00 — Morning</p>
          <h2 className="display-xl mt-4 text-[#f6f1e2]">
            The coffee bar<br />opens at <em className="accent">ten.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-[#efe9d8]">
            Flat whites under the trees, hot Dawa tea, a plate of Masala
            Chips, and a quiet table for the laptop crowd.
          </p>
        </div>
        <div className="dn-night-copy absolute bottom-24 left-5 right-5 max-w-2xl opacity-0 md:bottom-32 md:left-10 md:right-10">
          <p className="eyebrow">22:00 — Night</p>
          <h2 className="display-xl mt-4 text-[#f2f0e4]">
            The draft taps<br />flow at <em className="accent">dusk.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-[#c9ccc0]">
            Lanterns come on, the pool table fills up, and the garden hums
            with jazz until the kitchen closes at ten.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══ Signature dishes — horizontal scroll ═══ */
function Signature() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const signatures = DISHES.filter((d) => d.signature);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const getDist = () => track.scrollWidth - section.clientWidth;
      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Signature dishes">
      <div className="flex h-[100dvh] flex-col justify-center">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <Reveal><p className="eyebrow">Signature dishes</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">
              A taste of the <em className="accent">fusion.</em>
            </h2>
          </Reveal>
        </div>

        <div ref={trackRef} className="mt-12 flex w-max items-stretch gap-6 pl-5 pr-[12vw] md:mt-16 md:gap-10 md:pl-10">
          {signatures.map((d, i) => (
            <Link
              key={d.id}
              to="/menu"
              className="dish-card group relative block w-[78vw] shrink-0 overflow-hidden rounded-2xl no-underline sm:w-[52vw] md:w-[38vw] lg:w-[30vw]"
              aria-label={`${d.name}, ${ksh(d.price)} — view menu`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={d.image} alt={d.name} className="dish-img h-full w-full object-cover" loading="lazy" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.85)] via-transparent to-transparent" />
                <span aria-hidden className="absolute left-5 top-5 font-display text-2xl font-light italic text-[rgba(242,240,228,0.85)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                  <div>
                    <h3 className="font-display text-2xl font-normal leading-tight text-[#f2f0e4] md:text-3xl">{d.name}</h3>
                    <p className="mt-1 max-w-[30ch] text-sm text-[#c9ccc0]">{d.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[rgba(11,14,12,0.55)] px-3.5 py-1.5 text-sm font-semibold text-[#e8a33d] backdrop-blur-md">
                    {ksh(d.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* end card */}
          <Link
            to="/menu"
            className="group flex w-[70vw] shrink-0 flex-col items-start justify-center gap-6 rounded-2xl border border-[rgba(242,240,228,0.12)] p-8 no-underline transition-colors hover:border-[#e8a33d] sm:w-[42vw] md:w-[28vw]"
            aria-label="View the full menu"
          >
            <p className="font-display text-3xl font-light leading-tight text-[#f2f0e4] md:text-4xl">
              Twelve dishes,<br /><em className="accent">two worlds.</em>
            </p>
            <span className="link-arrow text-[#e8a33d]">
              View full menu <Arrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ What makes us unique ═══ */
function Uniqueness() {
  const items = [
    {
      n: "01",
      title: "African & Chinese Fusion",
      body: "A menu that bridges two rich culinary traditions, from Mapo Tofu to Masala Chips.",
      img: "/images/dish-mapo-tofu.jpg",
      alt: "Mapo tofu in a clay bowl",
    },
    {
      n: "02",
      title: "All-Day Coffee & Bar",
      body: "Start with a Dawa tea and finish with a draft beer. We're open from 10 AM to 10 PM.",
      img: "/images/interior.jpg",
      alt: "Mosaic interior with mosaic-tile bar",
    },
    {
      n: "03",
      title: "The Garden Oasis",
      body: "A rare outdoor escape in Nairobi, complete with floral arches and a pool table.",
      img: "/images/garden-arch.jpg",
      alt: "Flowering arch over the garden courtyard",
    },
  ];
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal><p className="eyebrow">What makes us unique</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">More than a restaurant.<br />A <em className="accent">sanctuary.</em></h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/story" className="link-arrow text-[#c9ccc0]">Read our story <Arrow /></Link>
        </Reveal>
      </div>

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.n} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
            <article className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={it.img} alt={it.alt} className="dish-img h-full w-full object-cover" loading="lazy" />
                <span aria-hidden className="absolute bottom-3 left-4 font-display text-5xl font-light italic text-[rgba(242,240,228,0.9)] drop-shadow-lg">
                  {it.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-normal text-[#f2f0e4]">{it.title}</h3>
              <p className="mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-[#8a8d80]">{it.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ Events teaser ═══ */
function EventsTeaser() {
  const featured = EVENTS.slice(0, 2);
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal><p className="eyebrow">Happening at Mosaic</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">Live nights &amp;<br />lazy <em className="accent">Sundays.</em></h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/events" className="link-arrow text-[#c9ccc0]">View all events <Arrow /></Link>
        </Reveal>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {featured.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.12}>
            <Link to="/events" className="dish-card group relative block overflow-hidden rounded-2xl no-underline" aria-label={`${ev.title} — view events`}>
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={ev.image} alt={ev.title} className="dish-img h-full w-full object-cover" loading="lazy" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.88)] via-[rgba(8,10,8,0.15)] to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-3">
                  <span className="rounded-full bg-[rgba(11,14,12,0.55)] px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] text-[#e8a33d] uppercase backdrop-blur-md">
                    {ev.category}
                  </span>
                  <span className="rounded-full bg-[rgba(11,14,12,0.55)] px-3.5 py-1.5 text-[0.68rem] font-medium tracking-wide text-[#e6e4d8] backdrop-blur-md">
                    {ev.date} · {ev.time}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-3xl font-normal leading-tight text-[#f2f0e4] md:text-4xl">{ev.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-sm text-[#c9ccc0]">{ev.description}</p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══ Reviews ═══ */
function Reviews() {
  return (
    <section className="border-y border-[rgba(242,240,228,0.08)] bg-[#0d110d] py-24 md:py-32" aria-label="Guest reviews">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Fixed alignment here */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <p className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.9] text-[#f2f0e4]">
                {INFO.rating}
              </p>
              <span className="text-3xl text-[#e8a33d]">★</span>
              <span className="text-lg text-[#8a8d80]">/ 5</span>
            </div>
            <p className="mt-4 text-sm text-[#8a8d80]">Based on {INFO.reviewCount} Google reviews</p>
          </Reveal>
          
          <Reveal delay={0.1} className="max-w-md md:pb-2">
            <p className="text-[1.05rem] leading-relaxed text-[#c9ccc0] md:text-right">
              Loved for our fusion cuisine,<br className="hidden md:block" /> pet-friendly garden, and craft beer.
            </p>
          </Reveal>
        </div>
      </div>
      
      <div className="mt-14 overflow-hidden">
        <Marquee
          items={REVIEWS.map((r) => ({ quote: r.quote, when: r.when }))}
          render={(r) => (
            <figure className="mx-5 w-[320px] shrink-0 rounded-xl border border-[rgba(242,240,228,0.1)] bg-[rgba(242,240,228,0.03)] p-6 sm:w-[420px]">
              <div className="text-[0.8rem] tracking-[0.25em] text-[#e8a33d]" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[#d6d8cc]">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs tracking-wide text-[#8a8d80] uppercase">Google review · {r.when}</figcaption>
            </figure>
          )}
        />
      </div>
    </section>
  );
}

/* ═══ Closing CTA ═══ */
function ClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 py-32 text-center md:px-10 md:py-44">
        <Reveal><p className="eyebrow">George Padmore Road · Kilimani</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-hero mx-auto mt-6 max-w-[16ch] text-[#f2f0e4]">
            Ready to experience <em className="accent">the Mosaic?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-[1.02rem] leading-relaxed text-[#b9bcae]">
            Morning coffee or late-night draft beer — there's always a seat
            for you in the garden.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/reserve" className="btn-primary">Book your table</Link>
          <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            Find the garden
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <DayNight />
      <Signature />
      <Uniqueness />
      <EventsTeaser />
      <Reviews />
      <ClosingCta />
    </>
  );
}