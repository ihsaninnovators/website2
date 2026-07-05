import React, { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

/**
 * Generic CRUD manager for a Base44 entity.
 * fields: [{ key, label, type: "text"|"textarea"|"number"|"select"|"image"|"url", options?, imageAspect? }]
 */
export default function ResourceManager({ entity, fields, title, tag, sortField = "display_order" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | {} (new) | existing
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    base44.entities[entity].list(sortField)
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [entity, sortField]);

  useEffect(() => { load(); }, [load]);

  const startNew = () => {
    const blank = {};
    fields.forEach((f) => { blank[f.key] = f.default ?? (f.type === "number" ? 0 : ""); });
    setEditing(blank);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const data = { ...editing };
      delete data.id; delete data.created_date; delete data.updated_date; delete data.created_by_id;
      if (editing.id) {
        await base44.entities[entity].update(editing.id, data);
      } else {
        await base44.entities[entity].create(data);
      }
      setEditing(null);
      load();
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    try {
      await base44.entities[entity].delete(id);
      load();
    } catch (e) {
      alert("Delete failed: " + (e.message || "unknown"));
    }
  };

  const setField = (key, val) => setEditing((p) => ({ ...p, [key]: val }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="mono-tag mb-2">[{tag}]</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        </div>
        <button onClick={startNew} className="btn-primary">
          <Plus size={15} className="mr-1" /> ADD_NEW
        </button>
      </div>

      {loading ? (
        <div className="mono-tag py-20 text-center">[LOADING...]</div>
      ) : items.length === 0 ? (
        <div className="border border-border p-16 text-center">
          <p className="mono-tag mb-2">[NO_RECORDS]</p>
          <p className="text-muted-foreground">No {title.toLowerCase()} found. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                {fields.filter((f) => !f.hiddenInTable).map((f) => (
                  <th key={f.key} className="text-left px-4 py-3 mono-tag font-normal">[{f.label}]</th>
                ))}
                <th className="text-right px-4 py-3 mono-tag font-normal">[ACTIONS]</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-border last:border-0 hover:bg-secondary transition-colors">
                  {fields.filter((f) => !f.hiddenInTable).map((f) => (
                    <td key={f.key} className="px-4 py-3 align-top">
                      {f.type === "image" && it[f.key] ? (
                        <img src={it[f.key]} alt="" className="w-12 h-12 object-cover border border-border" />
                      ) : f.type === "textarea" ? (
                        <span className="text-muted-foreground line-clamp-2 max-w-xs">{it[f.key] || "—"}</span>
                      ) : (
                        <span className={f.mono ? "font-mono text-primary" : ""}>{it[f.key] ?? "—"}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditing(it)} className="inline-flex p-1.5 text-muted-foreground hover:text-primary transition-colors" aria-label="Edit"><Pencil size={15} /></button>
                    <button onClick={() => remove(it.id)} className="inline-flex p-1.5 text-muted-foreground hover:text-primary transition-colors ml-1" aria-label="Delete"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* editor drawer */}
      {editing && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-background border-l border-border h-full overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <p className="mono-tag">{editing.id ? "[EDIT_RECORD]" : "[NEW_RECORD]"}</p>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-primary transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-6">
              {fields.map((f) => (
                <div key={f.key}>
                  {f.type === "image" ? (
                    <ImageUpload label={f.label} value={editing[f.key]} onChange={(v) => setField(f.key, v)} aspect={f.imageAspect || "aspect-square"} />
                  ) : f.type === "textarea" ? (
                    <>
                      <label className="mono-tag block mb-2">[{f.label}]</label>
                      <textarea value={editing[f.key] || ""} rows={4} onChange={(e) => setField(f.key, e.target.value)} className="field-dark resize-none" placeholder={f.placeholder || ""} />
                    </>
                  ) : f.type === "select" ? (
                    <>
                      <label className="mono-tag block mb-2">[{f.label}]</label>
                      <select value={editing[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} className="field-dark bg-background">
                        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="mono-tag block mb-2">[{f.label}]</label>
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        value={editing[f.key] ?? ""}
                        onChange={(e) => setField(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                        className="field-dark"
                        placeholder={f.placeholder || ""}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="mono-tag text-primary mt-4">[ERROR: {error}]</p>}

            <div className="mt-8 flex gap-3">
              <button onClick={save} disabled={saving} className="btn-primary flex-1">
                {saving ? <Loader2 size={15} className="animate-spin mr-2" /> : <Save size={15} className="mr-2" />}
                {saving ? "SAVING..." : "SAVE_CHANGES"}
              </button>
              <button onClick={() => setEditing(null)} className="btn-ghost">CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}