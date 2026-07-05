import React from "react";
import { ArrowUpRight } from "lucide-react";

const SPECS = [
  ["MACHINES", "Bambu Lab H2D · H2S · X1-C"],
  ["MAX VOLUME", "340×320×340mm"],
  ["LAYERS", "0.04mm min"],
  ["COLORS", "Up to 16"],
];

const SERVICES = [
  { title: "Custom Printing", body: "Send us your STL or CAD files and we'll handle manufacturing and quality control." },
  { title: "Design & Retail", body: "Custom-designed products available for purchase — from functional holders to artistic pieces." },
];

export default function PrintingService() {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="mono-tag mb-5">[SERVICE // 3D_PRINTING]</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.95]">
              II 3D PRINT.<br /><span className="text-muted-foreground">CUSTOM PRINTS,</span><br /><span className="text-primary">COMMUNITY PRICED.</span>
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground leading-relaxed">
              Beyond the competition floor, our team runs a community 3D printing service — high-quality prints for a small fee based on size and material. Run by Aayan & Ammaar, co-founders of Ihsan Innovators #30695.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="https://ii3dprint.com/" target="_blank" rel="noreferrer" className="btn-primary group">
                Visit ii3dprint.com
                <ArrowUpRight size={15} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="mailto:ihsaninnovators@gmail.com" className="btn-ghost">Request a Print</a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {SERVICES.map((s) => (
                <article key={s.title} className="bg-background p-6 border border-transparent hover:border-primary transition-colors">
                  <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="border border-border p-6 md:p-8 h-full">
              <p className="mono-tag mb-6">[MACHINE_SPECS]</p>
              <div className="space-y-5">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="border-b border-border pb-5 last:border-0 last:pb-0">
                    <p className="mono-tag text-primary/80">{k}</p>
                    <p className="font-mono text-sm mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <a href="https://ii3dprint.com/#gallery" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 mono-tag hover:text-primary transition-colors">
                <ArrowUpRight size={14} /> VIEW_PRINT_GALLERY
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}