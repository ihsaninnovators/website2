import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Send, Github, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await base44.entities.ContactSubmission.create(form);
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Submission failed.");
      setStatus("idle");
    }
  };

  return (
    <div className="border-b border-border">
      <section className="border-b border-border py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <Link to="/" className="mono-tag inline-flex items-center gap-2 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={14} /> BACK_TO_HOME
          </Link>
          <p className="mono-tag mb-5">[SECTION // COMMS_CHANNEL]</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
            OPEN A<br /><span className="text-primary">CHANNEL.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Prospective members, sponsors, or community partners — transmit your message below. We respond on every frequency.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* form */}
          <div className="lg:col-span-7">
            {status === "done" ? (
              <div className="border border-primary p-10 md:p-16">
                <p className="mono-tag text-primary mb-4">[TRANSMISSION_RECEIVED]</p>
                <h2 className="text-3xl font-bold tracking-tight mb-3">Message sent.</h2>
                <p className="text-muted-foreground mb-8">We've received your message and will respond shortly.</p>
                <button onClick={() => setStatus("idle")} className="btn-ghost">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div>
                  <label className="mono-tag block mb-2">[NAME]</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="field-dark"
                  />
                </div>
                <div>
                  <label className="mono-tag block mb-2">[EMAIL]</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="field-dark"
                  />
                </div>
                <div>
                  <label className="mono-tag block mb-2">[MESSAGE]</label>
                  <textarea
                    required value={form.message} rows={6}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    className="field-dark resize-none"
                  />
                </div>
                {error && <p className="mono-tag text-primary">[ERROR: {error}]</p>}
                <button type="submit" disabled={status === "loading"} className="btn-primary group">
                  {status === "loading" ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                  <Send size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>

          {/* info */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-8">
            <div>
              <p className="mono-tag mb-4">[DIRECT_CONTACT]</p>
              <div className="space-y-4">
                {settings?.contact_email && (
                  <a href={`mailto:${settings.contact_email}`} className="flex items-start gap-3 group">
                    <Mail size={18} className="text-primary mt-0.5" />
                    <div>
                      <p className="mono-tag">EMAIL</p>
                      <p className="text-foreground group-hover:text-primary transition-colors break-all">{settings.contact_email}</p>
                    </div>
                  </a>
                )}
                {settings?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5" />
                    <div>
                      <p className="mono-tag">ADDRESS</p>
                      <p className="text-foreground">{settings.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px blueprint-line" />

            <div>
              <p className="mono-tag mb-4">[SOCIAL_FREQUENCIES]</p>
              <div className="flex flex-col gap-3">
                {settings?.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Instagram size={18} /> <span className="mono-tag">INSTAGRAM</span>
                  </a>
                )}
                {settings?.github_url && (
                  <a href={settings.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Github size={18} /> <span className="mono-tag">GITHUB</span>
                  </a>
                )}
                {settings?.youtube_url && (
                  <a href={settings.youtube_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Youtube size={18} /> <span className="mono-tag">YOUTUBE</span>
                  </a>
                )}
              </div>
            </div>

            <div className="h-px blueprint-line" />

            <div>
              <p className="mono-tag mb-2">[TEAM_ID]</p>
              <p className="text-2xl font-bold tracking-tight">{settings?.team_number || "#30695"}</p>
              <p className="mono-tag mt-1">{settings?.location || "SAN_JOSE_CA"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}