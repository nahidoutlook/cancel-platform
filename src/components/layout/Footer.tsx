import Link from "next/link";



export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">CancelEasy</h3>
          <p className="text-sm text-gray-400">
            Helping you cancel unwanted subscriptions quickly and safely.
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Streaming</li>
            <li>Software</li>
            <li>Finance</li>
            <li>Gaming</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link>
</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3">Get Help</h4>
          <p className="text-sm text-gray-400">
            1-800-555-0199
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs pb-6">
        © 2026 CancelEasy. All rights reserved.
      </div>
    </footer>
  );
}
