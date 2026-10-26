import { useEffect, useState } from "react";
import { INFO, REVIEWS } from "@/data/content";
import { Reveal, SplitReveal } from "@/components/Reveal";

function ReviewRotator() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5200);
    return () => window.clearInterval(t);
  }, [paused]);
  const r = REVIEWS[index];
  return (
    <div
      className="rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] p-8 md:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      <div className="text-[0.8rem] tracking-[0.25em] text-[#e8a33d]" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote key={index} className="mt-5 min-h-[7rem] font-display text-xl font-light leading-relaxed text-[#e6e4d8] md:text-2xl">
        “{r.quote}”
      </blockquote>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs tracking-wide text-[#8a8d80] uppercase">Google review · {r.when}</p>
        <div className="flex gap-2" role="tablist" aria-label="Review selector">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[#e8a33d]" : "w-1.5 bg-[rgba(242,240,228,0.25)] hover:bg-[rgba(242,240,228,0.5)]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-40 pb-28 md:px-10 md:pt-52 md:pb-40">
      <Reveal><p className="eyebrow">Find us</p></Reveal>
      <h1 className="display-hero mt-4 max-w-[15ch] text-[#f2f0e4]">
        <SplitReveal text="Come for the coffee," />
        <br />
        <em className="accent"><SplitReveal text="stay for the vibe." delay={0.35} /></em>
      </h1>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-lg text-[1.02rem] leading-relaxed text-[#b9bcae]">
          We're on George Padmore Road in the heart of Kilimani — follow the
          bougainvillea arch and the smell of masala spices.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Info card */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-10 rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] p-8 md:p-12">
            <div>
              <p className="eyebrow">Location</p>
              <address className="mt-4 font-display text-2xl font-light not-italic leading-snug text-[#f2f0e4] md:text-3xl">
                {INFO.address[0]}
                <br />
                {INFO.address[1]}
              </address>
              <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="link-arrow mt-4 text-sm">
                Open in Google Maps
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="grid gap-8 border-t border-[rgba(242,240,228,0.08)] pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-4">Contact</p>
                <a href={INFO.phoneHref} className="block text-[1.05rem] text-[#e6e4d8] transition-colors hover:text-[#e8a33d]">
                  {INFO.phone}
                </a>
                <a href={INFO.emailHref} className="mt-1 block text-[1.05rem] text-[#e6e4d8] transition-colors hover:text-[#e8a33d]">
                  {INFO.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-4">Opening hours</p>
                <p className="text-[1.05rem] text-[#e6e4d8]">Monday – Sunday</p>
                <p className="text-[1.05rem] text-[#e6e4d8]">9:00 AM – 10:30 PM</p>
                <p className="mt-1 text-sm text-[#8a8d80]">Kitchen closes 10:00 PM</p>
              </div>
            </div>

            <div className="mt-auto overflow-hidden rounded-xl">
              <img src="/images/garden-arch.jpg" alt="The flowering arch at the entrance to Mosaic Kitchen" className="aspect-[16/9] w-full object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>

        {/* Reviews + rating */}
        <div className="flex flex-col gap-8">
          <Reveal delay={0.2}>
            <div className="grid grid-cols-[auto_1fr] items-center gap-8 rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] p-8 md:p-10">
              <div>
                <p className="font-display text-6xl font-light leading-none text-[#e8a33d] md:text-7xl">{INFO.rating}</p>
                <p className="mt-2 text-[0.8rem] tracking-[0.2em] text-[#e8a33d]">★★★★★</p>
              </div>
              <div>
                <p className="font-display text-xl font-normal text-[#f2f0e4] md:text-2xl">What our guests say</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#8a8d80]">
                  Based on {INFO.reviewCount} Google reviews. Loved for our
                  fusion cuisine, pet-friendly garden, and craft beer.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="flex-1">
            <ReviewRotator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
