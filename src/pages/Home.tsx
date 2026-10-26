
import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GardenCanvas = lazy(() =>
  import("@/components/GardenCanvas").then((m) => ({
    default: m.GardenCanvas,
  }))
);

import { Reveal, SplitReveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { DISHES, EVENTS, INFO, REVIEWS, ksh } from "@/data/content";
import { useOpenStatus } from "@/hooks/useOpenStatus";

gsap.registerPlugin(ScrollTrigger);

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 8h11M9 3.5 13.5 8 9 12.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function useNairobiTime() {
  const formatTime = () =>
    new Intl.DateTimeFormat("en-KE", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Nairobi",
    }).format(new Date());

  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatTime());
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function NairobiClock() {
  const time = useNairobiTime();

  return (
    <span className="tabular-nums text-[#b9bcae]">{time}</span>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */

function Hero() {
  const { open, label } = useOpenStatus();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b0e0c]">
      <Suspense fallback={null}>
        <GardenCanvas />
      </Suspense>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e0c] via-[rgba(11,14,12,0.28)] to-[rgba(11,14,12,0.24)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(11,14,12,0.58)] via-transparent to-transparent"
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-36 md:px-10 md:pb-28">
        <div className="pointer-events-auto mb-8 inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-full border border-white/15 bg-[#0b0e0c]/55 px-4 py-2 backdrop-blur-md">
          <span
            className={`status-dot ${open ? "" : "closed"}`}
            aria-hidden="true"
          />

          <span className="text-xs font-medium tracking-wide text-[#e6e4d8] sm:text-[0.78rem]">
            {label}
          </span>

          <span className="hidden text-[#8a8d80] sm:inline">·</span>

          <span className="hidden text-xs text-[#b9bcae] sm:inline">
            <NairobiClock /> in Nairobi
          </span>
        </div>

        <h1 className="display-hero max-w-[13ch] text-[#f2f0e4]">
          <SplitReveal text="Nairobi's best kept" delay={0.1} />
          <br />
          <em className="accent">
            <SplitReveal text="garden secret." delay={0.4} />
          </em>
        </h1>

        <div className="pointer-events-auto mt-8 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-[#d0d2c7]">
            African and Chinese fusion in a Kilimani garden.
            <br className="hidden sm:block" />
            Coffee by day, draft beer by night.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/reserve" className="btn-primary">
              Reserve a table
            </Link>

            <Link to="/menu" className="btn-ghost">
              Explore the menu
            </Link>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span
          className="text-[0.62rem] uppercase tracking-[0.35em] text-[#a5a798]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   BRAND MANIFESTO
───────────────────────────────────────── */

function Manifesto() {
  const stats = [
    {
      value: INFO.rating,
      label: "Google rating",
      detail: `From ${INFO.reviewCount} reviews`,
    },
    {
      value: "12",
      label: "Fusion dishes",
      detail: "Plus rotating specials",
    },
    {
      value: "10–10",
      label: "Open every day",
      detail: "Coffee at ten, last call at ten",
    },
  ];

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">The Mosaic idea</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#96998c]">
              George Padmore Road, Kilimani — where the bold, spicy notes of
              Chinese cuisine meet the rich, earthy flavours of African cooking.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="font-display text-[clamp(1.8rem,3.6vw,3.4rem)] font-light leading-[1.22] tracking-tight text-[#e6e4d8]">
            The best meals bring{" "}
            <em className="accent">different worlds</em> together — a coffee
            spot for early risers, a draft-beer haven after dark, and a garden
            lounge for <em className="accent">everyone in between.</em>
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-9 border-t border-white/[0.1] pt-9 sm:grid-cols-3 sm:gap-8 md:mt-24 md:pt-12">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <div>
              <p className="font-display text-5xl font-light text-[#e8a33d] md:text-6xl">
                {stat.value}
              </p>

              <p className="mt-3 text-sm font-medium text-[#e6e4d8]">
                {stat.label}
              </p>

              <p className="mt-1 text-sm text-[#8a8d80]">
                {stat.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DAY TO NIGHT
───────────────────────────────────────── */

function DayNight() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    if (motionQuery.matches || mobileQuery.matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      timeline
        .to(".dn-day-img", { opacity: 0, scale: 1.06, ease: "none" }, 0)
        .to(".dn-day-tint", { opacity: 0, ease: "none" }, 0)
        .fromTo(
          ".dn-night-img",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, ease: "none" },
          0
        )
        .to(".dn-day-copy", { opacity: 0, y: -24, ease: "none" }, 0)
        .fromTo(
          ".dn-night-copy",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: "none" },
          0.3
        )
        .to(".dn-sky", { opacity: 1, ease: "none" }, 0.15);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[760px] overflow-hidden bg-[#101610] md:h-[100svh] md:min-h-0"
      aria-label="From day to night at Mosaic"
    >
      <img
        src="/images/hero-garden.jpg"
        alt="Mosaic garden terrace illuminated in the evening"
        className="dn-night-img absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
        loading="lazy"
        decoding="async"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#0b0e0c]/35"
      />

      <img
        src="/images/event-brunch.jpg"
        alt="A garden brunch table in the morning light"
        className="dn-day-img absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div
        aria-hidden="true"
        className="dn-day-tint absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,192,106,0.25),transparent_60%)]"
      />

      <div
        aria-hidden="true"
        className="dn-sky pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e0c] via-transparent to-[rgba(4,8,14,0.75)]"
        style={{ opacity: 0 }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[rgba(11,14,12,0.72)] via-[rgba(11,14,12,0.2)] to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-32 md:h-full md:min-h-0 md:px-10 md:pb-28">
        <div className="dn-day-copy max-w-2xl">
          <p className="eyebrow !text-[#e7c98e]">10:00 — Morning</p>

          <h2 className="display-xl mt-4 text-[#f6f1e2]">
            The coffee bar
            <br />
            opens at <em className="accent">ten.</em>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#f0ecdf]">
            Flat whites under the trees, hot Dawa tea, a plate of Masala Chips,
            and a quiet table for the laptop crowd.
          </p>
        </div>

        <div className="dn-night-copy mt-16 max-w-2xl md:absolute md:bottom-28 md:left-10 md:right-10 md:mt-0 md:opacity-0">
          <p className="eyebrow">22:00 — Night</p>

          <h2 className="display-xl mt-4 text-[#f2f0e4]">
            The draft taps
            <br />
            flow at <em className="accent">dusk.</em>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#d6d8cc]">
            Lanterns come on, the pool table fills up, and the garden hums with
            music into the evening.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SIGNATURE DISHES
───────────────────────────────────────── */

function Signature() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const signatures = DISHES.filter((dish) => dish.signature);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || signatures.length < 2) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    if (motionQuery.matches || !desktopQuery.matches) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - section.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [signatures.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-0"
      aria-label="Signature dishes"
    >
      <div className="flex flex-col justify-center lg:min-h-[100svh] lg:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow">Signature dishes</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">
              A taste of the <em className="accent">fusion.</em>
            </h2>
          </Reveal>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#96998c]">
            Distinctive flavours, unexpected combinations, and dishes made for
            sharing.
          </p>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex w-max items-stretch gap-5 overflow-visible pl-5 pr-10 md:mt-14 md:gap-8 md:pl-10 lg:mt-16"
        >
          {signatures.map((dish, index) => (
            <Link
              key={dish.id}
              to="/menu"
              className="dish-card group relative block w-[78vw] max-w-[380px] shrink-0 overflow-hidden rounded-2xl no-underline sm:w-[52vw] md:w-[38vw] lg:w-[30vw]"
              aria-label={`${dish.name}, ${ksh(dish.price)} — view menu`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.92)] via-[rgba(8,10,8,0.05)] to-transparent"
                />

                <span className="absolute left-5 top-5 font-display text-2xl font-light italic text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-7">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-normal leading-tight text-[#f2f0e4] md:text-3xl">
                      {dish.name}
                    </h3>

                    <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-[#d0d2c7]">
                      {dish.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#0b0e0c]/75 px-3 py-2 text-sm font-semibold text-[#e8a33d] backdrop-blur-md">
                    {ksh(dish.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/menu"
            className="group flex w-[72vw] max-w-[380px] shrink-0 flex-col items-start justify-center gap-6 rounded-2xl border border-white/10 p-7 no-underline transition-colors duration-300 hover:border-[#e8a33d] sm:w-[45vw] lg:w-[28vw]"
            aria-label="Explore the full menu"
          >
            <p className="font-display text-3xl font-light leading-tight text-[#f2f0e4] md:text-4xl">
              Twelve dishes,
              <br />
              <em className="accent">two worlds.</em>
            </p>

            <span className="link-arrow text-[#e8a33d]">
              Explore the full menu <Arrow />
            </span>
          </Link>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1600px] px-5 text-xs tracking-wide text-[#777d70] md:px-10 lg:hidden">
          Swipe to discover <span aria-hidden="true">→</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WHY MOSAIC
───────────────────────────────────────── */

function Uniqueness() {
  const items = [
    {
      n: "01",
      title: "African & Chinese Fusion",
      body: "A menu that bridges two rich culinary traditions, from Mapo Tofu to Masala Chips.",
      img: "/images/dish-mapo-tofu.jpg",
      alt: "Mapo tofu prepared as part of Mosaic's fusion menu",
    },
    {
      n: "02",
      title: "All-Day Coffee & Bar",
      body: "Start with a Dawa tea and stay for an evening drink in a relaxed garden setting.",
      img: "/images/interior.jpg",
      alt: "Mosaic restaurant interior and bar",
    },
    {
      n: "03",
      title: "The Garden Oasis",
      body: "An outdoor escape in Nairobi, with a leafy courtyard, floral arches, and room to unwind.",
      img: "/images/garden-arch.jpg",
      alt: "Flowering arch in the Mosaic garden courtyard",
    },
  ];

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="eyebrow">What makes us unique</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">
              More than a restaurant.
              <br />A <em className="accent">sanctuary.</em>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Link to="/story" className="link-arrow text-[#c9ccc0]">
            Read our story <Arrow />
          </Link>
        </Reveal>
      </div>

      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-16">
        {items.map((item, index) => (
          <Reveal
            key={item.n}
            delay={index * 0.12}
            className={index === 1 ? "md:mt-16" : ""}
          >
            <article className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#171c16]">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="dish-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />

                <span className="absolute bottom-3 left-4 font-display text-5xl font-light italic text-white/90 drop-shadow-lg">
                  {item.n}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-normal text-[#f2f0e4]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-relaxed text-[#96998c]">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   EVENTS
───────────────────────────────────────── */

function EventsTeaser() {
  const featured = EVENTS.slice(0, 2);

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-40">
      <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="eyebrow">Happening at Mosaic</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="display-xl mt-3 text-[#f2f0e4]">
              Live nights &amp;
              <br />
              lazy <em className="accent">Sundays.</em>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Link to="/events" className="link-arrow text-[#c9ccc0]">
            View all events <Arrow />
          </Link>
        </Reveal>
      </div>

      {featured.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {featured.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.12}>
              <Link
                to="/events"
                className="dish-card group relative block overflow-hidden rounded-2xl no-underline"
                aria-label={`${event.title} — view events`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#171c16]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="dish-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.92)] via-[rgba(8,10,8,0.16)] to-transparent"
                  />

                  <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
                    <span className="rounded-full bg-[#0b0e0c]/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#e8a33d] backdrop-blur-md">
                      {event.category}
                    </span>

                    <span className="rounded-full bg-[#0b0e0c]/70 px-3 py-1.5 text-xs text-[#e6e4d8] backdrop-blur-md">
                      {event.date} · {event.time}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <h3 className="font-display text-3xl font-normal leading-tight text-[#f2f0e4] md:text-4xl">
                      {event.title}
                    </h3>

                    <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[#d0d2c7]">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 p-8 md:p-12">
          <p className="font-display text-2xl text-[#f2f0e4]">
            Something special is always brewing.
          </p>
          <Link to="/events" className="link-arrow mt-5 text-[#e8a33d]">
            Explore Mosaic events <Arrow />
          </Link>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────
   GUEST REVIEWS
───────────────────────────────────────── */

function Reviews() {
  return (
    <section
      className="border-y border-white/[0.08] bg-[#0d110d] py-20 md:py-32"
      aria-label="Guest reviews"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.9] text-[#f2f0e4]">
                {INFO.rating}
              </p>

              <span className="text-3xl text-[#e8a33d]" aria-hidden="true">
                ★
              </span>

              <span className="text-lg text-[#8a8d80]">/ 5</span>
            </div>

            <p className="mt-4 text-sm text-[#96998c]">
              Based on {INFO.reviewCount} Google reviews
            </p>
          </Reveal>

          <Reveal delay={0.1} className="max-w-md md:pb-2">
            <p className="text-base leading-relaxed text-[#c9ccc0] md:text-right">
              Loved for our fusion cuisine,
              <br className="hidden md:block" />
              garden atmosphere, and relaxed bar.
            </p>
          </Reveal>
        </div>
      </div>

      {REVIEWS.length > 0 && (
        <div className="mt-12 overflow-hidden md:mt-14">
          <Marquee
            items={REVIEWS.map((review) => ({
              quote: review.quote,
              when: review.when,
            }))}
            render={(review) => (
              <figure className="mx-3 w-[290px] shrink-0 rounded-xl border border-white/[0.1] bg-white/[0.03] p-5 sm:mx-5 sm:w-[420px] sm:p-6">
                <div
                  className="text-[0.8rem] tracking-[0.25em] text-[#e8a33d]"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>

                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[#d6d8cc]">
                  “{review.quote}”
                </blockquote>

                <figcaption className="mt-4 text-xs uppercase tracking-wide text-[#96998c]">
                  Google review · {review.when}
                </figcaption>
              </figure>
            )}
          />
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────
   CLOSING CALL TO ACTION
───────────────────────────────────────── */

function ClosingCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 py-24 text-center md:px-10 md:py-44">
        <Reveal>
          <p className="eyebrow">George Padmore Road · Kilimani</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="display-hero mx-auto mt-6 max-w-[16ch] text-[#f2f0e4]">
            Ready to experience <em className="accent">the Mosaic?</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-[#b9bcae]">
            Morning coffee or a relaxed evening in the garden — there's a seat
            waiting for you.
          </p>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12"
        >
          <Link to="/reserve" className="btn-primary">
            Book your table
          </Link>

          <a
            href={INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Find the garden
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0b0e0c] text-[#f2f0e4]">
      <Hero />
      <Manifesto />
      <DayNight />
      <Signature />
      <Uniqueness />
      <EventsTeaser />
      <Reviews />
      <ClosingCta />
    </main>
  );
}
