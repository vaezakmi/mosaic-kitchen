import { useMemo, useState } from "react";
import { Link } from "react-router";
import { DISHES, CATEGORIES, ksh, type Dietary, type Dish } from "@/data/content";
import { Reveal, SplitReveal } from "@/components/Reveal";

const FILTERS: { id: Dietary | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "spicy", label: "Spicy" },
  { id: "gf", label: "Gluten-free" },
  { id: "veg", label: "Vegetarian" },
];

function Tag({ t }: { t: Dietary }) {
  if (t === "spicy") return <span className="tag tag-spicy">Spicy</span>;
  if (t === "gf") return <span className="tag tag-gf">GF</span>;
  return <span className="tag tag-veg">Veg</span>;
}

function DishRow({ dish, flip }: { dish: Dish; flip: boolean }) {
  return (
    <Reveal>
      <article className={`dish-row group grid items-center gap-6 md:grid-cols-2 md:gap-12 ${flip ? "" : ""}`}>
        <div className={`relative overflow-hidden rounded-xl ${flip ? "md:order-2" : ""}`}>
          <div className="aspect-[16/10] overflow-hidden">
            <img src={dish.image} alt={dish.name} className="dish-img h-full w-full object-cover" loading="lazy" />
          </div>
          {dish.signature && (
            <span className="absolute left-4 top-4 rounded-full bg-[#e8a33d] px-3 py-1 text-[0.62rem] font-bold tracking-[0.14em] text-[#0b0e0c] uppercase">
              Signature
            </span>
          )}
        </div>
        <div className={flip ? "md:order-1 md:text-right" : ""}>
          <div className={`flex flex-wrap items-center gap-2 ${flip ? "md:justify-end" : ""}`}>
            {dish.tags.map((t) => <Tag key={t} t={t} />)}
          </div>
          <h3 className="mt-3 font-display text-3xl font-normal leading-tight text-[#f2f0e4] md:text-4xl">
            {dish.name}
          </h3>
          <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#8a8d80] md:inline-block">
            {dish.description}
          </p>
          <p className="mt-3 font-display text-2xl font-light italic text-[#e8a33d]">{ksh(dish.price)}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function Menu() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | "All">("All");
  const [filter, setFilter] = useState<Dietary | "all">("all");

  const visible = useMemo(
    () =>
      DISHES.filter(
        (d) =>
          (category === "All" || d.category === category) &&
          (filter === "all" || d.tags.includes(filter))
      ),
    [category, filter]
  );

  const grouped = useMemo(() => {
    const cats = category === "All" ? [...CATEGORIES] : [category];
    return cats
      .map((c) => ({ cat: c, items: visible.filter((d) => d.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [category, visible]);

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden px-5 pt-44 pb-20 md:px-10 md:pt-56 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(232,163,61,0.6), transparent 65%)" }}
        />
        <div className="mx-auto max-w-[1600px]">
          <Reveal><p className="eyebrow">The menu</p></Reveal>
          <h1 className="display-hero mt-4 max-w-[14ch] text-[#f2f0e4]">
            <SplitReveal text="Two worlds," />
            <br />
            <em className="accent"><SplitReveal text="one table." delay={0.3} /></em>
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-relaxed text-[#b9bcae]">
              African &amp; Chinese fusion, classic pub favorites, and barista
              coffee. All served with our signature Mosaic touch.
            </p>
          </Reveal>

          {/* Controls */}
          <Reveal delay={0.25} className="mt-12 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu category">
              {(["All", ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className="chip !px-4 !py-2 !text-[0.78rem]"
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label="Dietary filter">
              <span className="mr-1 text-xs tracking-[0.2em] text-[#8a8d80] uppercase">Filter</span>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className="chip"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dish groups */}
      <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        {grouped.length === 0 ? (
          <div className="rounded-xl border border-[rgba(242,240,228,0.1)] p-14 text-center">
            <p className="font-display text-2xl font-light text-[#e6e4d8]">Nothing matches that filter.</p>
            <p className="mt-2 text-sm text-[#8a8d80]">Try a different dietary filter or category.</p>
            <button
              type="button"
              className="btn-ghost mt-8"
              onClick={() => { setCategory("All"); setFilter("all"); }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-24 md:gap-32">
            {grouped.map((g) => (
              <div key={g.cat}>
                <Reveal className="mb-12 flex items-baseline gap-5">
                  <h2 className="font-display text-4xl font-light italic text-[#e8a33d] md:text-5xl">{g.cat}</h2>
                  <span className="h-px flex-1 bg-[rgba(242,240,228,0.1)]" aria-hidden />
                  <span className="text-xs tracking-[0.25em] text-[#8a8d80] uppercase">
                    {g.items.length} {g.items.length === 1 ? "item" : "items"}
                  </span>
                </Reveal>
                <div className="flex flex-col gap-16 md:gap-24">
                  {g.items.map((dish, i) => (
                    <DishRow key={dish.id} dish={dish} flip={i % 2 === 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* bottom CTA */}
        <Reveal className="mt-28 rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] px-8 py-14 text-center md:py-20">
          <p className="font-display text-3xl font-light leading-tight text-[#f2f0e4] md:text-5xl">
            Hungry? <em className="accent">The garden is waiting.</em>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/reserve" className="btn-primary">Reserve a table</Link>
            <a href="tel:+254712888777" className="btn-ghost">Call {INFO_PHONE}</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const INFO_PHONE = "0712 888 777";
