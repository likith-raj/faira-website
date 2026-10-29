"use client";
import { JapaneseTowerLandscape } from "@designcodeio/threeui/components/JapaneseTowerLandscape";
import "@designcodeio/threeui/style.css";

export default function JapaneseTowerScene() {
  return (
    <div className="w-full h-full">
      <JapaneseTowerLandscape country="japan" />
    </div>
  );
}
