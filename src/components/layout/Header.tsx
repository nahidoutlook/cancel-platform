import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-[44px] z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2">
        <Link href="/" className="text-xl font-semibold text-blue-500">
          CancelEasy
        </Link>

        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search 500+ subscriptions..."
            className="border rounded-md px-4 py-2 w-120 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="text-sm">Sign In</button>
          <button className="bg-green-300 text-white px-4 py-2 rounded-md text-sm">
            Live Chat
          </button>
        </div>
      </div>
    </header>
  );
}
