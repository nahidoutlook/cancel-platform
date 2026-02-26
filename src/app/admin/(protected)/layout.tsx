import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logout } from "./actions";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const userEmail = session.user.email;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">CancelPro Admin</h2>

          <nav className="space-y-4">
  <Link href="/admin" className="block hover:text-gray-300">
    Dashboard
  </Link>

  <Link href="/admin/brands" className="block hover:text-gray-300">
    Brands
  </Link>

  <Link href="/admin/leads" className="block hover:text-gray-300">
  Leads
</Link>

  <Link href="#" className="block hover:text-gray-300">
    Settings
  </Link>

          </nav>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Panel</h1>

          <div className="text-sm text-gray-600">
            Logged in as: <span className="font-medium">{userEmail}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}