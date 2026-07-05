import React from "react";
import SectionHeading from "@/components/SectionHeading";

export default function About({ settings }) {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <SectionHeading tag="ABOUT_US" title="Our Story" />
        </div>
        <div className="md:col-span-7 space-y-8">
          <div>
            <p className="text-2xl md:text-3xl font-medium leading-snug tracking-tight">
              {settings?.mission_statement}
            </p>
          </div>
          <div className="h-px blueprint-line w-full" />
          <div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {settings?.about_text || "While in their high school robotics club, five friends with a shared passion for STEM saw the need for a team that prioritized real learning. They envisioned a space where young, like-minded students could foster creativity and innovation. This dream is now the Ihsan Innovators, FTC Team #30695, based in San Jose, CA."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}