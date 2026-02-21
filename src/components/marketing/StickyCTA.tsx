"use client";

import { useEffect, useState } from "react";

export default function StickyCTA({ serviceName }: { serviceName: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.body.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent > 35) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (

    
    <div className="fixed bottom-0 inset-x-0 bg-background border-t shadow-xl p-4">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">

    <div>
      <p className="font-medium">
        Need help cancelling {serviceName}?
      </p>
      <p className="text-sm text-muted-foreground">
        Avoid extra charges. Get guided help now.
      </p>
    </div>


    <div className="flex flex-col items-start md:items-end gap-2">
      <button
  onClick={() => {
    const section = document.getElementById("lead-form");
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      const input = section.querySelector("input, textarea") as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;

      if (input) input.focus();

      section.classList.add("ring-2", "ring-primary", "ring-offset-4");

      setTimeout(() => {
        section.classList.remove("ring-2", "ring-primary", "ring-offset-4");
      }, 1800);
    }, 600);

    // Optional tracking
    if (typeof window !== "undefined") {
      console.log("Sticky CTA Clicked");
    }
  }}
className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-indigo-200 text-primary-foreground rounded-xl shadow-lg hover:opacity-90 transition"
>
  Request Help Online
</button>



      <div className="text-xs text-muted-foreground flex gap-4">
        <span>✔ No Account Login Required</span>
        <span>✔ Secure & private</span>
        <span>✔ Quick guidance</span>
      </div>
    </div>

  </div>
</div>

  );
}
