"use client";

import { useEffect, useState } from "react";

export default function ExitIntentPopup({ serviceName }: { serviceName: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, 
  

  
  []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-semibold mb-3">
          Wait! Need Help Cancelling {serviceName}?
        </h3>

        <p className="text-sm text-muted-foreground mt-2">
Avoid billing surprises. Our support team can guide you step-by-step before your next renewal date.
</p>


        <a
          href="#lead-form"
          className="block w-full text-center bg-primary text-white py-3 rounded-lg"
        >
          Get Assistance Now
        </a>

        <button
          onClick={() => setShow(false)}
          className="mt-4 text-sm text-muted-foreground w-full"
        >
          Get Instant Help Now

        </button>
      </div>
    </div>
  );
}
