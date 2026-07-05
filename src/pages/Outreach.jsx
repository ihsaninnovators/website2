import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function Outreach() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.OutreachProject.list("display_order")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="border-b border-border">
      <section className="border-b border-border py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <Link to="/" className="mono-tag inline-flex items-center gap-2 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> BACK_TO_HOME
          </Link>
          <p className="mono-tag mb-5">[SECTION // COMMUNITY_OUTREACH]</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
            BEYOND THE<br /><span className="text-muted-foreground">BOT.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            We share what we build with the community — workshops, mentorship, and STEM initiatives that extend the impact of our team far beyond the competition field.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {loading ? (
            <div className="text-center mono-tag py-20">[LOADING_PROJECTS...]</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="mono-tag">[NO_OUTREACH_PROJECTS]</p>
              <p className="text-muted-foreground mt-2">Outreach projects will appear here once an admin adds them.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {items.map((it, i) => (
                <article key={it.id} className="group bg-background p-8 md:p-10 hover:bg-secondary transition-colors flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <span className="mono-tag text-muted-foreground">[{String(i + 1).padStart(2, "0")}]</span>
                    {it.date_label && <span className="mono-tag text-primary">{it.date_label.toUpperCase()}</span>}
                  </div>
                  {it.image_url && (
                    <div className="aspect-[16/10] mb-6 overflow-hidden border border-border bg-secondary">
                      <img src={it.image_url} alt={it.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold tracking-tight">{it.title}</h3>
                  {it.impact && <p className="mono-tag text-primary mt-3">[{it.impact}]</p>}
                  {it.description && <p className="mt-4 text-muted-foreground leading-relaxed">{it.description}</p>}
                  {it.link_url && (
                    <a href={it.link_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 mono-tag hover:text-primary transition-colors">
                      <ArrowUpRight size={14} /> LEARN_MORE
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}