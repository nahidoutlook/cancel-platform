"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data";

export default function LiveSearch() {
  const [query, setQuery] = useState("");

  const filtered = services.filter((service) =>
    service.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto mb-12">
      <input
        type="text"
        placeholder="Search services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-3 rounded-lg"
      />

      {query && (
        <div className="border mt-2 rounded-lg bg-white max-h-64 overflow-auto">
          {filtered.slice(0, 20).map((service) => (
            <Link
              key={service.slug}
              href={`/cancel/${service.slug}`}
              className="block px-4 py-2 hover:bg-muted text-sm"
            >
              {service.name}
            </Link>
          ))}

          {!filtered.length && (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No services found
            </div>
          )}
        </div>
      )}
    </div>
  );
}