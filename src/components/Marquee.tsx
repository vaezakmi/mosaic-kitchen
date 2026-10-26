import type { ReactNode } from "react";

interface MarqueeProps<T> {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  className?: string;
  /** Duration in seconds for one full loop (default: 46) */
  speed?: number;
}

/**
 * Infinite horizontal marquee.
 * Duplicates content for a seamless -50% CSS translation loop.
 * Uses `inert` on the clone to prevent duplicate tab-stops and screen reader spam.
 */
export function Marquee<T>({
  items,
  render,
  className = "",
  speed = 46,
}: MarqueeProps<T>) {
  if (!items?.length) return null;

  return (
    <div
      className={`marquee group w-full min-w-0 overflow-hidden ${className}`}
      aria-label="Scrolling content"
    >
      <div
        className="marquee-track flex w-max min-w-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((copy) => {
          const isClone = copy === 1;
          return (
            <div
              key={copy}
              className="marquee-copy flex w-max shrink-0 items-stretch"
              aria-hidden={isClone}
              // Fix: Pass boolean directly to satisfy modern React DOM types
              inert={isClone ? true : undefined}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="marquee-item box-border min-w-0 shrink-0"
                >
                  {render(item, index)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}