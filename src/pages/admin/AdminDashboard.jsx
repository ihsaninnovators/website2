import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Users, Clock, Images, BarChart3, Building2, Inbox, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all([
      base44.entities.TeamMember.list(),
      base44.entities.TimelineEvent.list(),
      base44.entities.GalleryItem.list(),
      base44.entities.Stat.list(),
      base44.entities.Sponsor.list(),
      base44.entities.ContactSubmission.list(),
    ]).then(([t, tl, g, s, sp, c]) => {
      setCounts({
        TeamMember: t.length, TimelineEvent: tl.length, GalleryItem: g.length,
        Stat: s.length, Sponsor: sp.length, ContactSubmission: c.length,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: "Team Roster", path: "/admin/team", icon: Users, entity: "TeamMember" },
    { label: "Timeline Events", path: "/admin/timeline", icon: Clock, entity: "TimelineEvent" },
    { label: "Gallery Items", path: "/admin/gallery", icon: Images, entity: "GalleryItem" },
    { label: "Statistics", path: "/admin/stats", icon: BarChart3, entity: "Stat" },
    { label: "Sponsors", path: "/admin/sponsors", icon: Building2, entity: "Sponsor" },
    { label: "Submissions", path: "/admin/submissions", icon: Inbox, entity: "ContactSubmission" },
  ];

  return (
    <div>
      <p className="mono-tag mb-2">[SYSTEM_OVERVIEW]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Command Center</h1>
      <p className="text-muted-foreground mb-12">Manage all public-facing content for the Ihsan Innovators website.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.path} to={c.path} className="group bg-background p-8 hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-8">
                <Icon className="text-muted-foreground group-hover:text-primary transition-colors" size={24} strokeWidth={1.5} />
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-4xl font-bold tracking-tighter tabular-nums">{counts[c.entity] ?? "—"}</p>
              <p className="mono-tag mt-2">{c.label.toUpperCase().replace(/ /g, "_")}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 border border-border p-8">
        <p className="mono-tag mb-3">[QUICK_ACTIONS]</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/team" className="btn-ghost">EDIT_ROSTER</Link>
          <Link to="/admin/gallery" className="btn-ghost">ADD_GALLERY</Link>
          <Link to="/admin/settings" className="btn-ghost">EDIT_SETTINGS</Link>
          <Link to="/" target="_blank" className="btn-primary">VIEW_SITE</Link>
        </div>
      </div>
    </div>
  );
}