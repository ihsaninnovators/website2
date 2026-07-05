import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero({ settings }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [numberPos, setNumberPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setMouse({ x, y });
      setNumberPos({ x: e.clientX, y: e.clientY });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-border">
      {/* ghost team number following cursor */}
      <span
        className="pointer-events-none fixed z-10 font-mono text-[10vw] font-bold text-foreground/[0.04] select-none hidden md:block"
        style={{ transform: `translate(${numberPos.x - 120}px, ${numberPos.y - 80}px)` }}
      >
        #30695
      </span>

      {/* vertical spine */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px blueprint-line opacity-40 hidden md:block" />

      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <p className="mono-tag mb-6">[FTC {settings?.team_number || "#30695"} // {settings?.location || "SAN_JOSE_CA"}]</p>
          <h1 className="text-[15vw] md:text-[8rem] lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.85]">
            <span className="block">EMPOWERING</span>
            <span className="block text-muted-foreground">THE YOUTH</span>
            <span className="block text-primary">THROUGH TECH</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground leading-relaxed">
            {settings?.mission_statement || "Preparing tomorrow's innovators for today's challenges."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/gallery" className="btn-primary group">
              See What We Do
              <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-ghost">Get In Touch</Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div
            className="relative aspect-[4/5] border border-border overflow-hidden"
            style={{ transform: `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${-mouse.y * 4}deg)` }}
          >
            {settings?.hero_image_url ? (
              <img src={settings.hero_image_url} alt="Robot component" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary grid place-items-center">
                <span className="mono-tag">[IMAGE_PENDING]</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <span className="mono-tag text-foreground/70">[ROBOT.01]</span>
              <span className="mono-tag text-foreground/70">[LIVE]</span>
            </div>
          </div>
        </div>
      </div>

      {/* system status strip */}
      <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/60 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center justify-between gap-4">
          {[
            ["STATUS", "OPERATIONAL"],
            ["SEASON", "2025-26"],
            ["RANK", "COMPETING"],
            ["LOCATION", settings?.location || "SAN_JOSE_CA"],
          ].map(([k,v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="mono-tag text-primary/80">{k}</span>
              <span className="mono-tag text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}