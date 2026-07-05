import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageStats() {
  return (
    <ResourceManager
      entity="Stat"
      tag="MANAGE_STATISTICS"
      title="Team Statistics"
      sortField="display_order"
      fields={[
        { key: "label", label: "Label", type: "text", placeholder: "e.g. Outreach Hours" },
        { key: "value", label: "Value", type: "number" },
        { key: "suffix", label: "Suffix", type: "text", placeholder: "e.g. +, %, hrs", default: "" },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}