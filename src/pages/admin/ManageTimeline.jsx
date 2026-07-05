import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageTimeline() {
  return (
    <ResourceManager
      entity="TimelineEvent"
      tag="MANAGE_TIMELINE"
      title="Timeline Events"
      sortField="display_order"
      fields={[
        { key: "title", label: "Title", type: "text", placeholder: "Event title" },
        { key: "date", label: "Date Label", type: "text", placeholder: "e.g. June 2020" },
        { key: "description", label: "Description", type: "textarea", placeholder: "What happened..." },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}