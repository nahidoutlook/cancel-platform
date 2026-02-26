import { supabaseClient } from "@/lib/supabase/client";

export default async function TestPage() {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*");

  return (
    <div>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}