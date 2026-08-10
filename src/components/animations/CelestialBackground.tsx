import React from "react";

export default function CelestialBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0B0F19]">
      {/* Basic representation of stars */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #1c2642 0%, #0b0f19 100%)",
        }}
      ></div>
      <div className="absolute w-full h-full bg-[url('/src/assets/images/stars-bg.png')] opacity-30 bg-repeat bg-center"></div>

      {/* Some animated shooting stars or glowing orbs could go here */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
    </div>
  );
}
