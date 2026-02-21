import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = getSupabaseClient();

    const { error } = await supabase.from("leads").insert([
      {
        name: body.name,
        email: body.email,
        brand: body.brand,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}