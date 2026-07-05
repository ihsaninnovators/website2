import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageTeam() {
  return (
    <ResourceManager
      entity="TeamMember"
      tag="MANAGE_TEAM_ROSTER"
      title="Team Roster"
      sortField="display_order"
      fields={[
        { key: "name", label: "Name", type: "text", placeholder: "Full name" },
        { key: "role", label: "Role", type: "text", placeholder: "e.g. Mechanical Captain" },
        { key: "group", label: "Group", type: "select", options: ["Captain", "Mentor", "Member"] },
        { key: "sub_team", label: "Sub-Team", type: "select", options: ["Mechanical", "Programming", "Business/Outreach", "CAD", "Admin", "Mentor"] },
        { key: "bio", label: "Bio", type: "textarea", placeholder: "Member biography..." },
        { key: "email", label: "Email", type: "text", placeholder: "email@example.com" },
        { key: "photo_url", label: "Photo", type: "image" },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}