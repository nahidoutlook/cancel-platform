import { createBrand } from "../actions";

export default function NewBrandPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Brand</h1>

      <form action={createBrand} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="block mb-1 font-medium">Brand Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Meta Title</label>
          <input
            type="text"
            name="meta_title"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Meta Description</label>
          <textarea
            name="meta_description"
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Create Brand
        </button>
      </form>
    </div>
  );
}