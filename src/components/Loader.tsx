import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PRELOAD = [
  "/images/hero-garden.jpg",
  "/images/interior.jpg",
  "/images/dish-mapo-tofu.jpg",
  "/images/dish-pork-belly.jpg",
  "/images/event-jazz.jpg",
  "/images/garden-arch.jpg",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let loaded = 0;
    let finished = false;
    const bump = () => {
      loaded += 1;
      setProgress(Math.round((loaded / PRELOAD.length) * 100));
      if (loaded >= PRELOAD.length && !finished) finish();
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      const el = rootRef.current;
      const done = () => {
        setHidden(true);
        onDone();
      };
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        done();
        return;
      }
      gsap.timeline({ onComplete: done })
        .to(".loader-bar", { scaleX: 1, duration: 0.25, ease: "power2.out" })
        .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.15 })
        .set(el, { display: "none" });
    };
    PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });
    // hard cap — never hold the page hostage
    const cap = window.setTimeout(finish, 3800);
    return () => window.clearTimeout(cap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0e0c]"
      role="status"
      aria-label="Loading Mosaic Kitchen"
    >
      <div className="overflow-hidden">
        <p className="font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-none tracking-tight text-[#f2f0e4]">
          Mosaic<span className="italic text-[#e8a33d]">.</span>
        </p>
      </div>
      <p className="eyebrow mt-4">The Night Garden · Kilimani</p>
      <div className="mt-10 h-px w-52 overflow-hidden bg-[rgba(242,240,228,0.12)]">
        <div
          className="loader-bar h-full w-full bg-[#e8a33d]"
          style={{ transform: `scaleX(${progress / 100})`, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </div>
      <p className="mt-3 text-xs tabular-nums tracking-[0.3em] text-[#b9bcae]">{progress}%</p>
    </div>
  );
}
