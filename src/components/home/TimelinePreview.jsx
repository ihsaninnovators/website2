import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function TimelinePreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    base44.entities.TimelineEvent.list("display_order")
      .then(setEvents)
      .catch(() => {});
  }, []);

  return (
    <section className="border-b border-border py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeading tag="TIMELINE" title="The build, season by season." />
        <div className="mt-16 relative">
          {/* horizontal line */}
          <div className="absolute left-0 right-0 top-8 h-px blueprint-line hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {events.map((e, i) => (
              <article key={e.id} className="relative md:pr-4">
                <div className="hidden md:flex items-center mb-8">
                  <span className="w-4 h-4 border border-primary bg-background z-10" />
                </div>
                <p className="mono-tag text-primary mb-2">{e.date}</p>
                <h3 className="text-lg font-bold tracking-tight mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                <span className="mono-tag mt-4 block opacity-50">[{String(i+1).padStart(2,"0")}/{String(events.length).padStart(2,"0")}]</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}