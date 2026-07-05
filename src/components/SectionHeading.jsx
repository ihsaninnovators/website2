import React from "react";

export default function SectionHeading({ tag, title, align = "left", light = false }) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      {tag && <p className="mono-tag mb-5">{`[SECTION // ${tag}]`}</p>}
      <h2 className={`text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] ${light ? "text-foreground" : "text-foreground"}`}>
        {title}
      </h2>
    </div>
  );
}