import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { Mail } from "lucide-react";

function MemberCard({ m }) {
  return (
    <article className="group border border-border p-6 hover:border-primary transition-colors duration-300 bg-background">
      <div className="aspect-square mb-5 overflow-hidden bg-secondary border border-border">
        {m.photo_url ? (
          <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <span className="font-mono text-3xl font-bold text-muted-foreground">{m.name.split(" ").map(n=>n[0]).join("")}</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
        <p className="mono-tag mt-1 mb-3">{m.sub_team.toUpperCase().replace("/","_")}</p>
      {m.bio && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{m.bio}</p>}
      {m.email && (
        <a href={`mailto:${m.email}`} className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Mail size={13} /> <span className="break-all">{m.email}</span>
        </a>
      )}
    </article>
  );
}

export default function TeamPreview() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.TeamMember.list("display_order")
      .then(setMembers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const captains = members.filter((m) => m.group === "Captain");
  const mentors = members.filter((m) => m.group === "Mentor");
  const teamMembers = members.filter((m) => m.group === "Member");

  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading tag="OUR_TEAM" title="Captains, mentors, members." />
          <p className="text-muted-foreground max-w-sm">Meet the people behind the machines — where passion meets expertise, and where the next generation of engineers is forged.</p>
        </div>

        {loading ? (
          <div className="text-center mono-tag py-20">[LOADING_TEAM_DATA...]</div>
        ) : (
          <div className="space-y-16">
            <div>
              <p className="mono-tag mb-6">[CAPTAINS // {captains.length}]</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {captains.map((m) => (
                  <div key={m.id} className="bg-background"><MemberCard m={m} /></div>
                ))}
              </div>
            </div>

            <div>
              <p className="mono-tag mb-6">[MENTORS_AND_COACHES // {mentors.length}]</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                {mentors.map((m) => (
                  <div key={m.id} className="bg-background"><MemberCard m={m} /></div>
                ))}
              </div>
            </div>

            <div>
              <p className="mono-tag mb-6">[TEAM_MEMBERS // {teamMembers.length}]</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
                {teamMembers.map((m) => (
                  <div key={m.id} className="bg-background p-5 border border-transparent hover:border-primary transition-colors">
                    <div className="aspect-square mb-3 bg-secondary grid place-items-center overflow-hidden">
                      {m.photo_url ? (
                        <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover grayscale" />
                      ) : (
                        <span className="font-mono text-xl font-bold text-muted-foreground">{m.name.split(" ").map(n=>n[0]).join("")}</span>
                      )}
                    </div>
                    <p className="text-sm font-bold truncate">{m.name}</p>
                    <p className="mono-tag mt-1">{m.sub_team.toUpperCase().replace("/","_")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}