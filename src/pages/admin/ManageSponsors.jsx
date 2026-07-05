import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageSponsors() {
  return (
    <ResourceManager
      entity="Sponsor"
      tag="MANAGE_SPONSORS"
      title="Sponsors"
      sortField="display_order"
      fields={[
        { key: "name", label: "Name", type: "text", placeholder: "Sponsor name" },
        { key: "logo_url", label: "Logo", type: "image", imageAspect: "aspect-[3/1]" },
        { key: "link_url", label: "Link URL", type: "text", placeholder: "https://..." },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}