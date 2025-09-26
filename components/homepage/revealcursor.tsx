"use client";

import { useEffect, useState } from "react";

export default function RevealCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://picsum.photos/1920/1080')`, // replace with your image
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          WebkitMaskImage: `radial-gradient(circle 100px at ${cursorPos.x}px ${cursorPos.y}px, transparent 99px, black 100px)`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskComposite: "destination-out",
          maskImage: `radial-gradient(circle 100px at ${cursorPos.x}px ${cursorPos.y}px, transparent 99px, black 100px)`,
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
