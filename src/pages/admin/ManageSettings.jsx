import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ManageSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key, val) => setSettings((p) => ({ ...p, [key]: val }));

  const save = async () => {
    setSaving(true);
    setDone(false);
    try {
      const data = { ...settings };
      delete data.id; delete data.created_date; delete data.updated_date; delete data.created_by_id;
      if (settings.id) {
        await base44.entities.SiteSetting.update(settings.id, data);
      } else {
        const created = await base44.entities.SiteSetting.create(data);
        setSettings((p) => ({ ...p, id: created.id }));
      }
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (e) {
      alert("Save failed: " + (e.message || "unknown"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mono-tag py-20 text-center">[LOADING_SETTINGS...]</div>;
  if (!settings) return <div className="mono-tag py-20 text-center">[NO_SETTINGS_RECORD]</div>;

  const F = ({ label, children }) => (
    <div>
      <label className="mono-tag block mb-2">[{label}]</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <p className="mono-tag mb-2">[SITE_SETTINGS]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Site Settings</h1>
      <p className="text-muted-foreground mb-12">Global configuration for the public site.</p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <F label="Team Number"><input type="text" value={settings.team_number || ""} onChange={(e) => set("team_number", e.target.value)} className="field-dark" /></F>
          <F label="Location"><input type="text" value={settings.location || ""} onChange={(e) => set("location", e.target.value)} className="field-dark" /></F>
        </div>

        <F label="Mission Statement">
          <textarea value={settings.mission_statement || ""} rows={3} onChange={(e) => set("mission_statement", e.target.value)} className="field-dark resize-none" />
        </F>

        <F label="About / Story Text">
          <textarea value={settings.about_text || ""} rows={6} onChange={(e) => set("about_text", e.target.value)} className="field-dark resize-none" />
        </F>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <F label="Contact Email"><input type="email" value={settings.contact_email || ""} onChange={(e) => set("contact_email", e.target.value)} className="field-dark" /></F>
          <F label="Contact Phone"><input type="text" value={settings.contact_phone || ""} onChange={(e) => set("contact_phone", e.target.value)} className="field-dark" /></F>
        </div>

        <F label="Address"><input type="text" value={settings.address || ""} onChange={(e) => set("address", e.target.value)} className="field-dark" /></F>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <F label="Instagram URL"><input type="url" value={settings.instagram_url || ""} onChange={(e) => set("instagram_url", e.target.value)} className="field-dark" placeholder="https://instagram.com/..." /></F>
          <F label="GitHub URL"><input type="url" value={settings.github_url || ""} onChange={(e) => set("github_url", e.target.value)} className="field-dark" placeholder="https://github.com/..." /></F>
        </div>
        <F label="YouTube URL"><input type="url" value={settings.youtube_url || ""} onChange={(e) => set("youtube_url", e.target.value)} className="field-dark" placeholder="https://youtube.com/..." /></F>

        <F label="Hero Image">
          <ImageUpload label="" value={settings.hero_image_url} onChange={(v) => set("hero_image_url", v)} aspect="aspect-[4/5]" />
        </F>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? <Loader2 size={15} className="animate-spin mr-2" /> : <Save size={15} className="mr-2" />}
          {saving ? "SAVING..." : "SAVE_CHANGES"}
        </button>
        {done && <span className="mono-tag text-primary animate-pulse">[SAVED_OK]</span>}
      </div>
    </div>
  );
}