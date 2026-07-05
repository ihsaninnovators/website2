import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Trash2, Mail } from "lucide-react";

export default function AdminSubmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    base44.entities.ContactSubmission.list("-created_date")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this submission?")) return;
    await base44.entities.ContactSubmission.delete(id);
    load();
  };

  return (
    <div>
      <p className="mono-tag mb-2">[CONTACT_SUBMISSIONS]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Submissions</h1>
      <p className="text-muted-foreground mb-10">Messages received through the public contact form.</p>

      {loading ? (
        <div className="mono-tag py-20 text-center">[LOADING...]</div>
      ) : items.length === 0 ? (
        <div className="border border-border p-16 text-center">
          <p className="mono-tag mb-2">[NO_SUBMISSIONS]</p>
          <p className="text-muted-foreground">No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-px bg-border">
          {items.map((s) => (
            <div key={s.id} className="bg-background p-6 border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold">{s.name}</span>
                    <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1 mono-tag text-primary hover:underline">
                      <Mail size={12} /> {s.email}
                    </a>
                  </div>
                  <p className="mono-tag text-muted-foreground mb-3">
                    {s.created_date ? new Date(s.created_date).toLocaleString() : ""}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{s.message}</p>
                </div>
                <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}