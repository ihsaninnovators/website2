import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => setSettings(null));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar settings={settings} />
      <main className="pt-16 md:pt-20">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}