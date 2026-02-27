import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const statusFilter = url.searchParams.get("status") || "";
    const deviceFilter = url.searchParams.get("device") || "";
    const startDate = url.searchParams.get("start") || "";
    const endDate = url.searchParams.get("end") || "";

    const supabase = await createSupabaseServerClient();

    let query = supabase.from("leads").select("*");

    // Apply search filter
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,brand_name.ilike.%${search}%`
      );
    }

    // Status filter
    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    // Device filter
    if (deviceFilter) {
      query = query.eq("device", deviceFilter);
    }

    // Date range filter
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error("Export error:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // Build CSV
    const headers = [
      "Brand",
      "Name",
      "Email",
      "Phone",
      "Message",
      "IP",
      "Location",
      "Device",
      "Status",
      "Date",
    ];

    const csv = [
      headers.join(","),
      ...leads.map((lead: any) =>
        [
          lead.brand_name,
          lead.name,
          lead.email,
          lead.phone,
          `"${(lead.message || "").replace(/"/g, '""')}"`,
          lead.ip,
          lead.location,
          lead.device,
          lead.status,
          new Date(lead.created_at).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads.csv"`,
      },
    });
  } catch (err) {
    console.error("Export API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}