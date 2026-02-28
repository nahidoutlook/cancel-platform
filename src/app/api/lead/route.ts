import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Use SERVER client (important)
    const supabase = await createSupabaseServerClient();

    const headerList = await headers();

    // ✅ IP Address
    const forwarded = headerList.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "127.0.0.1";

    // ✅ Country (Vercel / Cloudflare support)
    const country =
      headerList.get("x-vercel-ip-country") ||
      headerList.get("cf-ipcountry") ||
      "Local";

    // ✅ Device Detection
    const userAgent = headerList.get("user-agent") || "";
    let device = "desktop";

    if (/mobile/i.test(userAgent)) device = "mobile";
    else if (/tablet|ipad/i.test(userAgent)) device = "tablet";

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
        location: country,
        status: "new",
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
