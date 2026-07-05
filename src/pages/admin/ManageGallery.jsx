import React from "react";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageGallery() {
  return (
    <ResourceManager
      entity="GalleryItem"
      tag="MANAGE_GALLERY"
      title="Gallery Items"
      sortField="display_order"
      fields={[
        { key: "title", label: "Title", type: "text", placeholder: "Component name" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Technical description..." },
        { key: "image_url", label: "Image", type: "image", imageAspect: "aspect-[4/3]" },
        { key: "component_id", label: "Component ID", type: "text", placeholder: "e.g. ARM_01", mono: true, default: "ROBOT_01" },
        { key: "material", label: "Material", type: "text", placeholder: "e.g. CNC_ALUMINUM", mono: true, default: "CARBON_FIBER" },
        { key: "display_order", label: "Display Order", type: "number" },
      ]}
    />
  );
}