export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">🚧 Under Maintenance</h1>
        <p className="text-gray-600 mb-6">
          Our website is currently undergoing scheduled maintenance.
          <br />
          Please check back later. We’ll be back soon!
        </p>
        <div className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved.</div>
      </div>
    </div>
  );
}
