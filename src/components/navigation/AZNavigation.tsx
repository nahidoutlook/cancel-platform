"use client";

import { useState } from "react";

export default function AZNavigation() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [active, setActive] = useState<string | null>(null);

  function scrollToLetter(letter: string) {
    setActive(letter);
    const element = document.getElementById(letter);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => scrollToLetter(letter)}
          className={`px-3 py-1 rounded-md text-sm border ${
            active === letter
              ? "bg-primary text-white"
              : "hover:bg-muted"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}