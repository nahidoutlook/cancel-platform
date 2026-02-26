import Link from "next/link";
import { services } from "@/data";
import LiveSearch from "@/components/search/LiveSearch";
import AZNavigation from "@/components/navigation/AZNavigation";

export const metadata = {
  title: "All Cancellation Guides | A–Z Directory",
  description:
    "Browse all available subscription cancellation guides alphabetically. Quickly find the service you want to cancel.",
  alternates: {
    canonical: "/cancel",
  },
};

function groupAlphabetically() {
  return services.reduce((acc, service) => {
    const letter = service.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(service);
    return acc;
  }, {} as Record<string, typeof services>);
}

export default function CancelIndexPage() {
  const grouped = groupAlphabetically();
  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6 text-center">
        All Cancellation Guides (A–Z)
      </h1>

      <p className="text-center text-muted-foreground mb-12">
        Search or browse alphabetically to find your subscription cancellation guide.
      </p>

      {/* SMART LIVE SEARCH */}
      <LiveSearch />

      {/* A–Z NAVIGATION */}
      <AZNavigation />

      {/* ALPHABETICAL GROUPING */}
      <div className="space-y-12">
        {sortedLetters.map((letter) => (
          <div key={letter} id={letter}>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              {letter}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {grouped[letter].map((service) => (
                <Link
                  key={service.slug}
                  href={`/cancel/${service.slug}`}
                  className="border rounded-lg p-4 hover:shadow-sm transition"
                >
                  <h3 className="font-semibold">
                    Cancel {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}