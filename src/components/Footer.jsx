import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Youtube, Mail, MapPin } from "lucide-react";

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center w-8 h-8 border border-foreground font-mono text-xs font-bold">ii</span>
              <span className="text-lg font-bold tracking-tight">IHSAN INNOVATORS</span>
            </div>
            <p className="mono-tag mb-4">{settings?.team_number || "#30695"} // SAN_JOSE_CA</p>
            <p className="text-muted-foreground max-w-md leading-relaxed">{settings?.mission_statement}</p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="mono-tag mb-4">[NAVIGATE]</p>
            <ul className="space-y-2">
              {[["Home","/"],["Gallery","/gallery"],["Outreach","/outreach"],["Stats","/stats"],["Contact","/contact"],["Admin","/admin"]].map(([l,p]) => (
                <li key={p}><Link to={p} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mono-tag mb-4">[CONNECT]</p>
            <div className="space-y-3 text-sm">
              {settings?.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={15} /> <span className="break-all">{settings.contact_email}</span>
                </a>
              )}
              {settings?.address && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={15} /> <span>{settings.address}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-5">
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              )}
              {settings?.github_url && (
                <a href={settings.github_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <Github size={18} />
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3">
          <p className="mono-tag">© {year} IHSAN INNOVATORS // ALL RIGHTS RESERVED</p>
          <p className="mono-tag">FTC TEAM {settings?.team_number || "#30695"} // FIRST TECH CHALLENGE</p>
        </div>
      </div>
    </footer>
  );
}