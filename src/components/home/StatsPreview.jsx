import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";

export default function StatsPreview() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    base44.entities.Stat.list("display_order", 4)
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats.length) return null;

  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeading tag="DIAGNOSTIC_CORE" title="By the numbers." />
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.id} className="bg-background p-8 md:p-10 group">
              <p className="mono-tag mb-6">[{s.label.toUpperCase().replace(/\s/g,"_")}]</p>
              <p className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-none">
                <StatCounter value={s.value} suffix={s.suffix} />
              </p>
              <div className="mt-6 h-px w-full blueprint-line" />
              <p className="mono-tag mt-3 text-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}