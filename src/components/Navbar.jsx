import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "Stats", path: "/stats" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid place-items-center w-8 h-8 border border-foreground text-foreground font-mono text-xs font-bold group-hover:border-primary group-hover:text-primary transition-colors">ii</span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">IHSAN INNOVATORS</span>
            <span className="mono-tag mt-0.5">{settings?.team_number || "#30695"}</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.path} to={l.path}
              className={`mono-tag transition-colors hover:text-foreground ${location.pathname === l.path ? "text-foreground" : ""}`}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link to="/admin" className="mono-tag text-muted-foreground hover:text-primary transition-colors">ADMIN</Link>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((l) => (
              <Link key={l.path} to={l.path} className={`mono-tag py-3 border-b border-border ${location.pathname === l.path ? "text-foreground" : "text-muted-foreground"}`}>
                {l.label.toUpperCase()}
              </Link>
            ))}
            <Link to="/admin" className="mono-tag py-3 text-primary">ADMIN</Link>
          </nav>
        </div>
      )}
    </header>
  );
}