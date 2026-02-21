"use client";

import { useEffect, useState } from "react";

const names = ["James", "Olivia", "Liam", "Sophia", "Noah", "Emma"];

export default function LiveTicker({ serviceName }: { serviceName: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName =
        names[Math.floor(Math.random() * names.length)];

      setMessage(
        `${randomName} successfully cancelled ${serviceName} 5 minutes ago`
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [serviceName]);

  return (
    <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-full px-4 py-2 inline-flex items-center gap-2 shadow-sm">
      <span className="animate-pulse">●</span>
      {message || `Someone just cancelled ${serviceName}`}
    </div>
  );
}
