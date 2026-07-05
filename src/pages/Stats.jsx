import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatCounter from "@/components/StatCounter";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Stat.list("display_order")
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const max = Math.max(...stats.map((s) => s.value), 1);

  return (
    <div className="border-b border-border">
      <section className="border-b border-border py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <Link to="/" className="mono-tag inline-flex items-center gap-2 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> BACK_TO_HOME
          </Link>
          <p className="mono-tag mb-5">[SECTION // DIAGNOSTIC_CORE]</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
            DIAGNOSTIC<br /><span className="text-muted-foreground">CORE.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Performance converted to undeniable data. Live readouts from the season — every metric tracked, every hour counted.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {loading ? (
            <div className="text-center mono-tag py-20">[CALIBRATING_SENSORS...]</div>
          ) : stats.length === 0 ? (
            <div className="text-center py-20"><p className="mono-tag">[NO_STATISTICS]</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {stats.map((s, i) => (
                <div key={s.id} className="bg-background p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="mono-tag">[{String(i+1).padStart(2,"0")}]</span>
                    <span className="mono-tag text-foreground/50">LIVE</span>
                  </div>
                  <p className="text-6xl md:text-8xl font-bold tracking-tighter text-primary leading-none">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <div className="mt-8 h-px w-full blueprint-line relative">
                    <div className="absolute top-0 left-0 h-px bg-primary transition-all duration-1000" style={{ width: `${(s.value / max) * 100}%` }} />
                  </div>
                  <p className="mt-4 text-sm font-medium tracking-tight">{s.label}</p>
                  <p className="mono-tag mt-1 text-muted-foreground">[METRIC_{String(i+1).padStart(2,"0")}_TRACKED]</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}