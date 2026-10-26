import { Link, useSearchParams } from "react-router";
import { EVENTS } from "@/data/content";
import { Reveal, SplitReveal } from "@/components/Reveal";
import { useEffect } from "react";

export default function Events() {
  const [params] = useSearchParams();
  const highlight = params.get("event");

  useEffect(() => {
    if (!highlight) return;
    const el = document.getElementById(`event-${highlight}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlight]);

  return (
    <>
      <section className="relative overflow-hidden px-5 pt-44 pb-20 md:px-10 md:pt-56 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-[-8%] h-[28rem] w-[28rem] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(51,71,31,0.9), transparent 65%)" }}
        />
        <div className="mx-auto max-w-[1600px]">
          <Reveal><p className="eyebrow">Events &amp; experiences</p></Reveal>
          <h1 className="display-hero mt-4 max-w-[13ch] text-[#f2f0e4]">
            <SplitReveal text="Always" /> <em className="accent"><SplitReveal text="something" delay={0.25} /></em>
            <br />
            <SplitReveal text="happening." delay={0.4} />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-relaxed text-[#b9bcae]">
              From live music to pool tournaments, there's always something
              happening at Mosaic Kitchen. Reserve a spot — the garden does the rest.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <div className="flex flex-col gap-20 md:gap-28">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.id}>
              <article
                id={`event-${ev.id}`}
                className={`dish-card group grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14 ${
                  highlight === ev.id ? "rounded-2xl ring-1 ring-[#e8a33d]" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={ev.image} alt={ev.title} className="dish-img h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(8,10,8,0.45)] to-transparent" />
                  <div className="absolute left-5 top-5 rounded-xl bg-[rgba(11,14,12,0.65)] px-4 py-3 text-center backdrop-blur-md">
                    <p className="font-display text-3xl font-light leading-none text-[#e8a33d]">{ev.day}</p>
                    <p className="mt-1 text-[0.65rem] font-semibold tracking-[0.25em] text-[#e6e4d8] uppercase">{ev.month}</p>
                  </div>
                </div>

                <div className={i % 2 === 1 ? "md:order-first md:text-right" : ""}>
                  <p className="eyebrow">{ev.category}</p>
                  <h2 className="mt-3 font-display text-4xl font-normal leading-[1.05] text-[#f2f0e4] md:text-5xl">
                    {ev.title}
                  </h2>
                  <p className="mt-5 max-w-[48ch] text-[0.98rem] leading-relaxed text-[#8a8d80] md:ml-auto">
                    {ev.description}
                  </p>
                  <div className={`mt-6 flex flex-wrap gap-3 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                    <span className="chip !cursor-default">{ev.date}</span>
                    <span className="chip !cursor-default">{ev.time}</span>
                  </div>
                  <div className={`mt-8 flex flex-wrap gap-4 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                    <Link to={`/reserve?event=${ev.id}`} className="btn-primary">Reserve a spot</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Private events band */}
        <Reveal className="mt-28 grid gap-10 rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] p-8 md:grid-cols-[1.5fr_1fr] md:p-14">
          <div>
            <p className="eyebrow">Private gatherings</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-[#f2f0e4] md:text-5xl">
              Birthdays, watch parties,<br />
              <em className="accent">whole-garden takeovers.</em>
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-[#8a8d80]">
              A fantastic place for events, birthday parties, and family
              dinners — safe environment, friendly staff, and a kitchen that
              caters to both worlds. Tell us the occasion and we'll set the scene.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 md:items-end">
            <a href="tel:+254712888777" className="btn-primary">Call {PHONE}</a>
            <a href={MAPS} target="_blank" rel="noreferrer" className="btn-ghost">Plan a visit first</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const PHONE = "0712 888 777";
const MAPS = "https://www.google.com/maps/place/Mosaic+Kitchen,+Kilimani/@-1.2960023,36.7944743,20.5z";
