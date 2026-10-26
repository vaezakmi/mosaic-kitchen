import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Events from "@/pages/Events";
import Story from "@/pages/Story";
import Contact from "@/pages/Contact";
import Reserve from "@/pages/Reserve";

gsap.registerPlugin(ScrollTrigger);

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // let the new page paint, then re-measure pinned sections
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain min-h-[100dvh] bg-[#0b0e0c] text-[#f2f0e4]">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/events" element={<Events />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
