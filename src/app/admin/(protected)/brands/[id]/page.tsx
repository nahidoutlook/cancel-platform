import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updateBrand } from "../actions";

export default async function EditBrandPage(props: any) {
  const { id } = await props.params; // ✅ FIX HERE

  const supabase = await createSupabaseServerClient();

  const { data: brand, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !brand) {
    console.log("Error:", error);
    return notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Brand</h1>

      <form action={updateBrand} className="space-y-4 bg-white p-6 shadow rounded">
        <input type="hidden" name="id" value={brand.id} />

        <div>
          <label className="block mb-1 font-medium">Brand Name</label>
          <input
            type="text"
            name="name"
            defaultValue={brand.name}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={brand.description || ""}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Meta Title</label>
          <input
            type="text"
            name="meta_title"
            defaultValue={brand.meta_title || ""}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Meta Description</label>
          <textarea
            name="meta_description"
            defaultValue={brand.meta_description || ""}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={brand.is_published}
          />
          <label>Publish Brand</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Update Brand
        </button>
      </form>
    </div>
  );
}