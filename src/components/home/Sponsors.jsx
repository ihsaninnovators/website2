import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    base44.entities.Sponsor.list("display_order")
      .then(setSponsors)
      .catch(() => {});
  }, []);

  if (!sponsors.length) return null;

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <p className="mono-tag mb-3">[SUPPORTED_BY]</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">Our sponsors make it possible.</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border">
          {sponsors.map((s) => (
            <a key={s.id} href={s.link_url || "#"} target="_blank" rel="noreferrer" className="bg-background p-8 md:p-10 flex items-center justify-center min-h-[120px] group hover:bg-secondary transition-colors">
              {s.logo_url ? (
                <img src={s.logo_url} alt={s.name} className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all" />
              ) : (
                <span className="text-lg font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">{s.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}