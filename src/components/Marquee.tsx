import type { ReactNode } from "react";

interface MarqueeProps<T> {
  items: T[];
  render: (item: T, index: number) => ReactNode;
}

/** Infinite horizontal marquee — track is duplicated for a seamless loop. */
export function Marquee<T>({ items, render }: MarqueeProps<T>) {
  // If there are no items, don't render anything
  if (!items.length) return null;

  return (
    <div className="marquee group" aria-label="Scrolling content">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i} className="marquee-item">
                {render(item, i)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}