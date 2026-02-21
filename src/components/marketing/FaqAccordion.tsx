"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  items,
}: {
  items: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-xl p-5 bg-white shadow-sm"
        >
          <button
            className="w-full text-left font-semibold flex justify-between items-center"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            {item.question}
            <span className="text-xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
