import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "p" | "h2" | "h3" | "span";
}

/** Fade+rise reveal on scroll into view. Content is visible by default (no gating). */
export function Reveal({ children, className, delay = 0, y = 36, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

/** Character-by-character masked rise, triggered on scroll into view. */
export function SplitReveal({ text, className, delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".split-char > span");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => (c.style.transform = "none"));
      return;
    }
    const tween = gsap.to(chars, {
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      stagger: 0.022,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="split-char">
              <span>{ch}</span>
            </span>
          ))}
          {wi < text.split(" ").length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}
