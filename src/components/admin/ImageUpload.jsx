import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Loader2 } from "lucide-react";

export default function ImageUpload({ label, value, onChange, aspect = "aspect-square" }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } catch (e) {
      alert("Upload failed: " + (e.message || "unknown error"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="mono-tag block mb-2">[{label}]</label>}
      <div className={`relative ${aspect} w-full max-w-[200px] border border-border bg-secondary overflow-hidden grid place-items-center`}>
        {value ? (
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <span className="mono-tag text-muted-foreground">[NO_IMAGE]</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="mt-2 inline-flex items-center gap-2 mono-tag hover:text-primary transition-colors disabled:opacity-50"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? "UPLOADING..." : "UPLOAD_IMAGE"}
      </button>
    </div>
  );
}