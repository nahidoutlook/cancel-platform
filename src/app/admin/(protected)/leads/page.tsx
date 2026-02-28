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
  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createSupabaseServerClient();

  /* ===================== DATE SETUP ===================== */

  const now = new Date();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date();
  const day = weekStart.getDay();
  const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  /* ===================== BASIC STATS ===================== */

  const [
    { count: todayCount },
    { count: weekCount },
    { count: monthCount },
    { count: totalCount },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString()),

    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekStart.toISOString()),

    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthStart.toISOString()),

    supabase.from("leads").select("*", { count: "exact", head: true }),
  ]);

  /* ===================== SPAM ANALYTICS ===================== */

  const spamTodayStart = new Date();
  spamTodayStart.setHours(0, 0, 0, 0);

  const [
    { count: spamCount },
    { count: spamTodayCount },
    { data: spamIps },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "spam"),

    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "spam")
      .gte("created_at", spamTodayStart.toISOString()),

    supabase.from("leads").select("ip").eq("status", "spam"),
  ]);

  const spamRate =
    totalCount && totalCount > 0
      ? Math.round(((spamCount || 0) / totalCount) * 100)
      : 0;

  const spamIpStats =
    spamIps?.reduce((acc: any, lead: any) => {
      if (!lead.ip) return acc;
      acc[lead.ip] = (acc[lead.ip] || 0) + 1;
      return acc;
    }, {}) || {};

  const topSpamIps = Object.entries(spamIpStats)
    .sort((a: any, b: any) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  /* ===================== SEARCH + FILTER + PAGINATION ===================== */

  let query = supabase.from("leads").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,brand_name.ilike.%${search}%`
    );
  }

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  if (deviceFilter) {
    query = query.eq("device", deviceFilter);
  }

  query = query.order(sort, { ascending: false }).range(from, to);

  const { data: leads, count } = await query;
  const totalPages = Math.ceil((count || 0) / limit);

  /* ===================== UI ===================== */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today" value={todayCount} />
        <StatCard title="This Week" value={weekCount} />
        <StatCard title="This Month" value={monthCount} />
        <StatCard title="Total Leads" value={totalCount} />
      </div>

      {/* ===== SPAM ANALYTICS ===== */}
      <div className="bg-white p-5 rounded shadow mb-8 border border-red-200">
        <h2 className="text-lg font-bold text-red-600 mb-4">
          🧲 Spam Detection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <StatCard title="Total Spam" value={spamCount} red />
          <StatCard title="Spam Today" value={spamTodayCount} red />
          <StatCard title="Spam Rate" value={`${spamRate}%`} red />
          <StatCard
            title="Top Spam IP"
            value={topSpamIps[0]?.[0] || "—"}
          />
        </div>

        <ul className="text-sm space-y-1">
          {topSpamIps.map(([ip, count]) => (
            <li key={ip} className="flex justify-between">
              <span>{ip}</span>
              <span className="text-red-600 font-bold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== FILTER FORM ===== */}
      <form method="GET" className="flex gap-3 mb-6 flex-wrap">
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Apply
        </button>
      </form>

      {/* ===== CSV EXPORT ===== */}
      <form
        method="GET"
        action="/api/leads/export"
        className="mb-6 flex gap-2 flex-wrap"
      >
        <input type="hidden" name="search" value={search} />
        <input type="hidden" name="status" value={statusFilter} />
        <input type="hidden" name="device" value={deviceFilter} />

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

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Export CSV
        </button>
      </form>

      {/* ===== TABLE ===== */}
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
                <td className="p-3 whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
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

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  red,
}: {
  title: string;
  value: any;
  red?: boolean;
}) {
  return (
    <div className={`p-5 rounded shadow ${red ? "bg-red-100" : "bg-blue-100"}`}>
      <p className="text-gray-600 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value || 0}</h2>
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

    revalidatePath("/admin/leads");
  }

  const colors: any = {
    new: "bg-green-600",
    contacted: "bg-blue-600",
    converted: "bg-purple-600",
    spam: "bg-red-600",
  };

  return (
    <form action={updateStatus} className="flex gap-1 items-center">
      <select
        name="status"
        defaultValue={status}
        className={`px-2 py-1 rounded text-white ${
          colors[status] || "bg-gray-600"
        }`}
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