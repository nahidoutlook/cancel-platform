import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";


export default async function BrandsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: brands, error } = await supabase
    .from("brands")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading brands.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brands</h1>

        <Link
          href="/admin/brands/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Brand
        </Link>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {brands && brands.length === 0 && (
              <tr>
                <td className="p-4" colSpan={4}>
                  No brands yet.
                </td>
              </tr>
            )}

            {brands?.map((brand) => (
              <tr key={brand.id} className="border-b">
                <td className="p-4 font-medium">
                <Link
                    href={`/admin/brands/${brand.id}`}
                      className="text-blue-600 hover:underline"
                          >
                                 {brand.name}
                                          </Link>
                  </td>
                <td className="p-4 text-gray-600">{brand.slug}</td>
                <td className="p-4">
                  {brand.is_published ? (
                    <span className="text-green-600 font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      Draft
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(brand.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}