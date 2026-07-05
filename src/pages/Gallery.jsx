import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    base44.entities.GalleryItem.list("display_order")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="border-b border-border">
      {/* header */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <Link to="/" className="mono-tag inline-flex items-center gap-2 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> BACK_TO_HOME
          </Link>
          <p className="mono-tag mb-5">[SECTION // MACHINE_LAB]</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
            THE MACHINE<br /><span className="text-muted-foreground">LAB.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Hardware precision, documented. Hover any frame to reveal technical metadata — click to open the full breakdown.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {loading ? (
            <div className="text-center mono-tag py-20">[LOADING_COMPONENTS...]</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="mono-tag">[NO_GALLERY_ITEMS]</p>
              <p className="text-muted-foreground mt-2">Gallery items will appear here once an admin adds them.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-px">
              {items.map((it) => (
                <article
                  key={it.id}
                  onClick={() => setActive(it)}
                  className="group relative break-inside-avoid mb-px border border-border overflow-hidden bg-background cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={it.image_url}
                      alt={it.title}
                      className="w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="mono-tag text-primary">[COMPONENT_ID: {it.component_id}]</span>
                        <span className="mono-tag text-foreground/70">[MATERIAL: {it.material}]</span>
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 mono-tag text-foreground/80 bg-background/70 px-2 py-1">#{it.component_id}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold tracking-tight">{it.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{it.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* lightbox */}
      {active && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm p-6 md:p-10 overflow-y-auto" onClick={() => setActive(null)}>
          <div className="max-w-[1400px] mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <p className="mono-tag">[EXPANDED_VIEW // {active.component_id}]</p>
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Close">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 border border-border overflow-hidden">
                <img src={active.image_url} alt={active.title} className="w-full h-auto object-cover" />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <p className="mono-tag text-primary mb-3">[COMPONENT_ID: {active.component_id}]</p>
                  <h2 className="text-3xl font-bold tracking-tight">{active.title}</h2>
                </div>
                <div className="h-px blueprint-line" />
                <div>
                  <p className="mono-tag mb-2">[MATERIAL]</p>
                  <p className="font-mono text-primary">{active.material}</p>
                </div>
                <div className="h-px blueprint-line" />
                <div>
                  <p className="mono-tag mb-2">[DESCRIPTION]</p>
                  <p className="text-muted-foreground leading-relaxed">{active.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}