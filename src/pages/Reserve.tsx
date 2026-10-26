import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { EVENTS, INFO } from "@/data/content";
import { Reveal, SplitReveal } from "@/components/Reveal";

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  notes: string;
}

const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];

const initial: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "19:00",
  guests: "2",
  seating: "Garden terrace",
  notes: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!f.date) e.date = "Pick a date.";
  else if (f.date < new Date().toISOString().split("T")[0]) e.date = "That date has already passed.";
  if (!f.time) e.time = "Pick a time.";
  return e;
}

export default function Reserve() {
  const [params] = useSearchParams();
  const eventParam = params.get("event");
  const matchedEvent = useMemo(() => EVENTS.find((e) => e.id === eventParam), [eventParam]);

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<FormState | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // frontend-only persistence: this device, this browser
    try {
      const existing = JSON.parse(localStorage.getItem("mosaic-reservations") ?? "[]");
      existing.push({ ...form, event: matchedEvent?.title ?? null, createdAt: new Date().toISOString() });
      localStorage.setItem("mosaic-reservations", JSON.stringify(existing));
    } catch {
      /* storage unavailable — confirmation still shown */
    }
    setConfirmed(form);
  };

  const prettyDate = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-40 pb-28 md:px-10 md:pt-52 md:pb-40">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        {/* Left: pitch */}
        <div>
          <Reveal><p className="eyebrow">Reservations</p></Reveal>
          <h1 className="display-xl mt-4 text-[#f2f0e4]">
            <SplitReveal text="Your table under" />
            <br />
            <em className="accent"><SplitReveal text="the trees." delay={0.3} /></em>
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md text-[1rem] leading-relaxed text-[#b9bcae]">
              Tell us when, and we'll keep a corner of the garden warm for
              you. For parties of eight or more, call us and we'll plan it together.
            </p>
          </Reveal>

          {matchedEvent && (
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-xl border border-[rgba(232,163,61,0.35)] bg-[rgba(232,163,61,0.06)] p-5">
                <p className="eyebrow !text-[#e8a33d]">Reserving for an event</p>
                <p className="mt-2 font-display text-xl font-normal text-[#f2f0e4]">{matchedEvent.title}</p>
                <p className="mt-1 text-sm text-[#b9bcae]">{matchedEvent.date} · {matchedEvent.time}</p>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <div className="mt-12 space-y-4 border-t border-[rgba(242,240,228,0.1)] pt-8 text-[0.95rem] text-[#b9bcae]">
              <p>
                <span className="text-[#8a8d80]">Walk-ins</span> — always welcome at the bar and garden benches.
              </p>
              <p>
                <span className="text-[#8a8d80]">Large groups</span> —{" "}
                <a href={INFO.phoneHref} className="text-[#e8a33d] underline-offset-4 hover:underline">{INFO.phone}</a>
              </p>
              <p>
                <span className="text-[#8a8d80]">Hours</span> — Mon–Sun, 10:00 AM – 10:00 PM
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: form / confirmation */}
        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-[rgba(242,240,228,0.1)] bg-[#10150f] p-6 md:p-10">
            {confirmed ? (
              <div className="text-center" role="status">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(232,163,61,0.12)]">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 12.5 9.5 18 20 6.5" stroke="#e8a33d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-6 font-display text-3xl font-normal text-[#f2f0e4]">
                  See you in the garden, <em className="accent">{confirmed.name.split(" ")[0]}.</em>
                </h2>
                <dl className="mx-auto mt-8 max-w-sm space-y-3 text-left text-[0.95rem]">
                  <div className="flex justify-between gap-6 border-b border-[rgba(242,240,228,0.08)] pb-3">
                    <dt className="text-[#8a8d80]">Date</dt>
                    <dd className="text-[#e6e4d8]">{prettyDate(confirmed.date)}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-[rgba(242,240,228,0.08)] pb-3">
                    <dt className="text-[#8a8d80]">Time</dt>
                    <dd className="text-[#e6e4d8]">{confirmed.time}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-[rgba(242,240,228,0.08)] pb-3">
                    <dt className="text-[#8a8d80]">Party</dt>
                    <dd className="text-[#e6e4d8]">{confirmed.guests} {Number(confirmed.guests) === 1 ? "guest" : "guests"}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-[rgba(242,240,228,0.08)] pb-3">
                    <dt className="text-[#8a8d80]">Seating</dt>
                    <dd className="text-[#e6e4d8]">{confirmed.seating}</dd>
                  </div>
                  {matchedEvent && (
                    <div className="flex justify-between gap-6">
                      <dt className="text-[#8a8d80]">Event</dt>
                      <dd className="text-right text-[#e6e4d8]">{matchedEvent.title}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-8 text-xs leading-relaxed text-[#8a8d80]">
                  We'll confirm by phone ({confirmed.phone}) shortly. This booking is
                  saved on this device only.
                </p>
                <button
                  type="button"
                  className="btn-ghost mt-8 w-full"
                  onClick={() => { setConfirmed(null); setForm(initial); }}
                >
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="font-display text-2xl font-normal text-[#f2f0e4]">Book a table</h2>

                <div className="mt-7 flex flex-col gap-5">
                  <div>
                    <label htmlFor="rs-name" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Name</label>
                    <input id="rs-name" type="text" autoComplete="name" placeholder="Amina Wanjiku" value={form.name} onChange={set("name")} className={`field ${errors.name ? "field-error" : ""}`} />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="rs-phone" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Phone</label>
                    <input id="rs-phone" type="tel" autoComplete="tel" placeholder="0712 345 678" value={form.phone} onChange={set("phone")} className={`field ${errors.phone ? "field-error" : ""}`} />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rs-date" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Date</label>
                      <input id="rs-date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={set("date")} className={`field ${errors.date ? "field-error" : ""}`} />
                      {errors.date && <p className="error-text">{errors.date}</p>}
                    </div>
                    <div>
                      <label htmlFor="rs-time" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Time</label>
                      <select id="rs-time" value={form.time} onChange={set("time")} className="field">
                        {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rs-guests" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Guests</label>
                      <select id="rs-guests" value={form.guests} onChange={set("guests")} className="field">
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}
                        <option value="8+">8+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="rs-seating" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Seating</label>
                      <select id="rs-seating" value={form.seating} onChange={set("seating")} className="field">
                        <option>Garden terrace</option>
                        <option>Indoor lounge</option>
                        <option>Bar counter</option>
                        <option>By the pool table</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rs-notes" className="mb-2 block text-xs font-medium tracking-[0.15em] text-[#8a8d80] uppercase">Occasion or requests <span className="normal-case text-[#5a5d52]">(optional)</span></label>
                    <textarea id="rs-notes" rows={3} placeholder="Birthday, window seat, extra spicy…" value={form.notes} onChange={set("notes")} className="field resize-none" />
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-8 w-full">Request reservation</button>
                <p className="mt-4 text-center text-xs text-[#8a8d80]">
                  Saved on this device only — we'll confirm by phone.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
