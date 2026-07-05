import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageOutreach() {
  return (
    <ResourceManager
      entity="OutreachProject"
      tag="MANAGE_OUTREACH"
      title="Outreach Projects"
      sortField="display_order"
      fields={[
        { key: "title", label: "Title", type: "text", placeholder: "Project title" },
        { key: "description", label: "Description", type: "textarea", placeholder: "What the project is about..." },
        { key: "image_url", label: "Image", type: "image", imageAspect: "aspect-[16/10]" },
        { key: "date_label", label: "Date Label", type: "text", placeholder: "e.g. Summer 2024, Ongoing" },
        { key: "impact", label: "Impact Metric", type: "text", placeholder: "e.g. 500+ students reached" },
        { key: "link_url", label: "Link URL", type: "text", placeholder: "https://..." },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}