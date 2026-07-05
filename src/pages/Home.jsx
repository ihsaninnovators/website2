import React from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import About from "@/components/home/About";
import TeamPreview from "@/components/home/TeamPreview";
import TimelinePreview from "@/components/home/TimelinePreview";
import StatsPreview from "@/components/home/StatsPreview";
import Sponsors from "@/components/home/Sponsors";

export default function Home() {
  const { settings } = useOutletContext() || {};
  return (
    <>
      <Hero settings={settings} />
      <WhatWeDo />
      <About settings={settings} />
      <StatsPreview />
      <TeamPreview />
      <TimelinePreview />
      <Sponsors />
    </>
  );
}