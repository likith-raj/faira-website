"use client";
import { StructureFlowCollection } from "@designcodeio/threeui/components/StructureFlowCollection";
import "@designcodeio/threeui/style.css";

export default function StructureFlowScene() {
  return (
    <div className="w-full h-full">
      <StructureFlowCollection
        variant="structure-flow"
        speed={1.0}
        pointSize={0.08}
        opacity={0.9}
        maskStart={0.45}
        maskSolid={0.7}
      />
    </div>
  );
}
