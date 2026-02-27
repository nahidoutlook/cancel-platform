import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    search?: string;
    status?: string;
    device?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const sort = params?.sort || "created_at";
  const search = params?.search || "";
  const statusFilter = params?.status || "";
  const deviceFilter = params?.device || "";
  const page = parseInt(params?.page || "1");
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createSupabaseServerClient();

  let query = supabase.from("leads").select("*", { count: "exact" });

  // 🔍 Search
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,brand_name.ilike.%${search}%`
    );
  }

  // 🎯 Status filter
  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  // 📱 Device filter
  if (deviceFilter) {
    query = query.eq("device", deviceFilter);
  }

  // 🔽 Sorting + Pagination
  query = query.order(sort, { ascending: false }).range(from, to);

  const { data: leads, count } = await query;
  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* 🔎 Filters */}
      <form method="GET" className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search name, email, brand..."
          className="border px-3 py-2 rounded"
        />

        <select
          name="status"
          defaultValue={statusFilter}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="spam">Spam</option>
        </select>

        <select
          name="device"
          defaultValue={deviceFilter}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Devices</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Apply
        </button>
      </form>

      {/* 🔽 Sorting Links */}
      <div className="flex gap-4 mb-6 text-sm">
        <Link
          href={`/admin/leads?search=${search}&status=${statusFilter}&device=${deviceFilter}&sort=created_at`}
        >
          Sort by Date
        </Link>
        <Link
          href={`/admin/leads?search=${search}&status=${statusFilter}&device=${deviceFilter}&sort=name`}
        >
          Sort by Name
        </Link>
        <Link
          href={`/admin/leads?search=${search}&status=${statusFilter}&device=${deviceFilter}&sort=brand_name`}
        >
          Sort by Brand
        </Link>
      </div>

      {/* Export CSV */}
      
      <div className="mb-6 flex gap-2 flex-wrap">
  {/* Existing search and filters */}
  <form method="GET" className="flex gap-3 flex-wrap">
    {/* ... search and filter inputs ... */}
  </form>
      </div>

      {/* ===== CSV Export Form ===== */}
<form
  method="GET"
  action="/api/leads/export"
  className="mb-6 flex gap-2 flex-wrap"
>
  <input
    type="text"
    name="search"
    defaultValue={search}
    placeholder="Search..."
    className="border px-3 py-2 rounded"
  />
  <select
    name="status"
    defaultValue={statusFilter}
    className="border px-3 py-2 rounded"
  >
    <option value="">All Status</option>
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="converted">Converted</option>
    <option value="spam">Spam</option>
  </select>

  <select
    name="device"
    defaultValue={deviceFilter}
    className="border px-3 py-2 rounded"
  >
    <option value="">All Devices</option>
    <option value="desktop">Desktop</option>
    <option value="mobile">Mobile</option>
  </select>

  <input
    type="date"
    name="start"
    className="border px-3 py-2 rounded"
  />
  <input
    type="date"
    name="end"
    className="border px-3 py-2 rounded"
  />

  <button
    type="submit"
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Export CSV
  </button>
</form>



      {/* 📋 Table */}
      <div className="bg-white shadow rounded overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">Brand</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Message</th>
              <th className="p-3">IP</th>
              <th className="p-3">Location</th>
              <th className="p-3">Device</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-b align-top">
                <td className="p-3">{lead.brand_name}</td>
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3 max-w-xs">{lead.message}</td>
                <td className="p-3">{lead.ip}</td>
                <td className="p-3">{lead.location}</td>
                <td className="p-3 capitalize">{lead.device}</td>
                <td className="p-3">
                  <StatusDropdown id={lead.id} status={lead.status} />
                </td>
                <td className="p-3">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/admin/leads?search=${search}&status=${statusFilter}&device=${deviceFilter}&sort=${sort}&page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ================= STATUS DROPDOWN ================= */

function StatusDropdown({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  async function updateStatus(formData: FormData) {
    "use server";

    const newStatus = formData.get("status") as string;

    const supabase = await createSupabaseServerClient();

    await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);

    // Force refresh
    revalidatePath("/admin/leads");
  }

  const getColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-600";
      case "contacted":
        return "bg-blue-600";
      case "converted":
        return "bg-purple-600";
      case "spam":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <form action={updateStatus} className="flex gap-1 items-center">
      <select
        name="status"
        defaultValue={status}
        className={`px-2 py-1 rounded text-white ${getColor(status)}`}
      >
        <option value="new">new</option>
        <option value="contacted">contacted</option>
        <option value="converted">converted</option>
        <option value="spam">spam</option>
      </select>

      <button
        type="submit"
        className="text-xs bg-gray-200 px-2 py-1 rounded"
      >
        Save
      </button>
    </form>
  );
}