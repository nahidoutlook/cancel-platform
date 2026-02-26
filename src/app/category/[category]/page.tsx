import { services } from "@/data";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { category: string };
};

function getServicesByCategory(category: string) {
  return services.filter(
    (s) =>
      s.category.toLowerCase() ===
      decodeURIComponent(category).toLowerCase()
  );
}

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(services.map((s) => s.category.toLowerCase()))
  );

  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props) {
  const categoryName = decodeURIComponent(params.category);

  return {
    title: `Cancel ${categoryName} Subscriptions | Guides`,
    description: `Browse step-by-step guides to cancel ${categoryName} subscriptions easily.`,
    alternates: {
      canonical: `/category/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const filtered = getServicesByCategory(category);

  if (!filtered.length) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 capitalize">
        {category} Cancellation Guides
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((service) => (
          <Link
            key={service.slug}
            href={`/cancel/${service.slug}`}
            className="border rounded-lg p-4 hover:shadow-sm transition"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
}