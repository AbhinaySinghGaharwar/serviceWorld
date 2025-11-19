'use server'

export default async function Page() {
  try {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0b0b0c] text-gray-900 dark:text-gray-100 flex items-center justify-center p-6 transition-colors">

        <div className="bg-white dark:bg-[#151517] border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center transition">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Admin Profile
          </h1>

          {/* Add profile content here */}
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your admin profile. More settings will appear here soon.
          </p>

        </div>
      </div>
    )
  } catch (error) {
    console.error('Profile page error:', error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400 text-lg">
        ❌ Something went wrong while loading profile.
      </div>
    )
  }
}
