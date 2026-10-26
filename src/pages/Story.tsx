import { Link } from "react-router";
import { Reveal, SplitReveal } from "@/components/Reveal";

const VALUES = [
  {
    title: "A Mosaic of Flavors",
    body: "Mosaic Kitchen was born from a simple idea: that the best meals are the ones that bring different worlds together. Tucked away on George Padmore Road, we've created a space where the bold, spicy notes of Chinese cuisine meet the rich, earthy flavors of African cooking.",
  },
  {
    title: "More Than a Kitchen",
    body: "We're a coffee shop for the early risers, a draft beer haven for the evening crowd, and a vibrant garden lounge for everyone in between. With our lush greenery, art-filled walls, and warm wooden interiors, every corner of Mosaic is designed to make you feel at home.",
  },
  {
    title: "Sit Back, Stay Awhile",
    body: "Whether you're here for a quick masala chips and a latte, or a slow-cooked pork belly with a cold draft, we invite you to sit back, relax, and experience the mosaic.",
  },
];

export default function Story() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85dvh] items-end overflow-hidden">
        <img
          src="/images/interior.jpg"
          alt="Inside Mosaic Kitchen — warm wood, art-filled walls and the mosaic-tile bar"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0e0c] via-[rgba(11,14,12,0.35)] to-[rgba(11,14,12,0.45)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-44 md:px-10">
          <Reveal><p className="eyebrow">Our story</p></Reveal>
          <h1 className="display-hero mt-4 max-w-[14ch] text-[#f2f0e4]">
            <SplitReveal text="A garden sanctuary" />
            <br />
            <em className="accent"><SplitReveal text="in the city." delay={0.35} /></em>
          </h1>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-16 md:grid-cols-[1fr_1.5fr] md:gap-24">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <div className="relative overflow-hidden rounded-xl">
                <img src="/images/garden-arch.jpg" alt="Bougainvillea arch leading into the Mosaic courtyard" className="aspect-[3/4] w-full object-cover" loading="lazy" />
              </div>
              <p className="mt-4 text-xs tracking-[0.25em] text-[#8a8d80] uppercase">
                The arch · George Padmore Road
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <article className="border-t border-[rgba(242,240,228,0.1)] pt-10">
                  <span className="font-display text-lg font-light italic text-[#e8a33d]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-normal leading-tight text-[#f2f0e4] md:text-4xl">
                    {v.title}
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[1rem] leading-relaxed text-[#b9bcae]">{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-y border-[rgba(242,240,228,0.08)] bg-[#0d110d] px-5 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-light leading-[1.3] tracking-tight text-[#e6e4d8]">
              “A true sanctuary in the city. The perfect spot to escape the
              Nairobi hustle, grab a coffee, and{" "}
              <em className="accent">stay until the stars come out.</em>”
            </p>
            <p className="eyebrow mt-8">— A garden regular</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 text-center md:py-36">
        <Reveal>
          <h2 className="display-xl text-[#f2f0e4]">Come write your chapter<br />in the <em className="accent">garden.</em></h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/reserve" className="btn-primary">Reserve a table</Link>
          <Link to="/menu" className="btn-ghost">See what's cooking</Link>
        </Reveal>
      </section>
    </>
  );
}
