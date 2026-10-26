import { useEffect, useState } from "react";
import { INFO } from "@/data/content";

function nairobiHour(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  return hour === 24 ? 0 : hour;
}

export function useOpenStatus() {
  const [hour, setHour] = useState(nairobiHour);

  useEffect(() => {
    const t = window.setInterval(() => setHour(nairobiHour()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const open = hour >= INFO.hours.open && hour < INFO.hours.close;
  // closing time is fixed at 22:00 Africa/Nairobi — state it directly
  // instead of re-projecting a local Date across timezones
  return { open, label: open ? "Open now · closes 10:00 PM" : "Opens at 10:00 AM" };
}
