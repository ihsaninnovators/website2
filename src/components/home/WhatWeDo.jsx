import React from "react";
import { Cog, Code2, Briefcase, HeartHandshake, Printer } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const SERVICES = [
  { id: "01", icon: Cog, title: "Mechanical Design", body: "Custom design FTC robots from the ground up. We master advanced CAD software like SolidWorks to engineer and build robots to compete for each season's game." },
  { id: "02", icon: Code2, title: "Coding & Programming", body: "Empower robots with precision and control through months of coding, training members to develop software that enables autonomous operations and human control." },
  { id: "03", icon: Briefcase, title: "Business & Marketing", body: "Equip members with the skills needed to manage and raise funds. Through strategic marketing strategies, we build strong connections and ensure our team's continued growth." },
  { id: "04", icon: HeartHandshake, title: "Outreach Programs", body: "Engage in community projects that make a difference, especially those benefiting our local mosque, while showcasing your skills and contributing to a greater cause." },
  { id: "05", icon: Printer, title: "3D Printing Services", body: "Precision 3D printing for prototypes, custom robot parts, and community projects. We operate industrial-grade printers producing production-ready components in PLA, PETG, and TPU.", featured: true },
];

export default function WhatWeDo() {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeading tag="WHAT_WE_DO" title="Four disciplines. One mission." />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.id} className={`relative bg-background p-8 md:p-10 group hover:bg-secondary transition-colors duration-300 ${s.featured ? "md:col-span-1 lg:col-span-1 lg:row-span-1" : ""}`}>
                <div className="flex items-start justify-between mb-8">
                  <Icon className="text-muted-foreground group-hover:text-primary transition-colors" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}