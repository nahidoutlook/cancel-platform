import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = getSupabaseClient();

    const headerList = await headers();

    const ip =
      headerList.get("x-forwarded-for") ||
      headerList.get("x-real-ip") ||
      "unknown";

    const userAgent = headerList.get("user-agent") || "";

    let device = "desktop";

    if (/mobile/i.test(userAgent)) device = "mobile";
    if (/tablet/i.test(userAgent)) device = "tablet";

    const { error } = await supabase.from("leads").insert([
      {
        brand_slug: body.brand_slug,
        brand_name: body.brand_name,
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        message: body.message || "",
        ip,
        device,
        location: null, // we’ll enhance later
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}