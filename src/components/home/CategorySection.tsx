"use client";

import { useState } from "react";
import { services } from "@/data";
import Link from "next/link";

function groupByCategory() {
  return services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);
}

export default function CategorySection() {

  const grouped = groupByCategory();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Browse by Category
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Click a category to explore available cancellation guides.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Object.entries(grouped).map(([category, items]) => {
          const isOpen = openCategory === category;

          return (
            <div
              key={category}
              className="relative"
            >
              <button
                onClick={() =>
                  setOpenCategory(isOpen ? null : category)
                }
                className="w-full border border-border rounded-lg bg-card px-3 py-3 text-sm font-semibold hover:bg-muted transition flex justify-between items-center"
              >
                <span className="truncate">{category}</span>
                <span className="ml-1 text-xs flex-shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-3 space-y-2">
                    {items.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/cancel/${service.slug}`}
                        className="block text-xs text-muted-foreground hover:text-primary transition truncate hover:bg-gray-100 px-2 py-1 rounded"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}