export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Brands</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Leads</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Active Users</h2>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome Message</h2>
        <p className="text-gray-600">
          Admin dashboard loaded successfully. Authentication verified via
          server layout.
        </p>
      </div>
    </div>
  );
}