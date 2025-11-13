'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export default async function Page() {
  try {
    // 🍪 Get token from cookies
    const token = cookies().get('token')?.value

    if (!token) {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
          ❌ Unauthorized — Please log in first.
        </div>
      )
    }

    // 🔍 Verify JWT token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      console.error('Invalid token:', err)
      return (
        <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
          ⚠️ Session expired or invalid token.
        </div>
      )
    }

    // 🧠 Extract data
    const { email, role } = decoded

    // 🧩 Render admin profile
    return (
      <div className="min-h-screen bg-[#0b0b0c] text-gray-100 flex items-center justify-center p-6">
        <div className="bg-[#151517] border border-yellow-500/20 rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.1)] p-8 w-[90%] max-w-md text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">
            Admin Profile
          </h1>

          <div className="space-y-3 text-left text-gray-300">
            <p>
              <span className="text-yellow-400 font-medium">Email:</span>{' '}
              {email || 'Unknown'}
            </p>
            <p>
              <span className="text-yellow-400 font-medium">Role:</span>{' '}
              {role || 'N/A'}
            </p>
          </div>

          <form action="/admin/logout" method="POST" className="mt-6">
            <button
              formAction={logoutAction}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 rounded-lg font-semibold hover:shadow-[0_0_10px_rgba(250,204,21,0.3)] transition"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Profile page error:', error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-lg">
        ❌ Something went wrong while loading profile.
      </div>
    )
  }
}

// 🧹 Logout action
async function logoutAction() {
  'use server'
  const cookieStore = cookies()
  cookieStore.set({
    name: 'token',
    value: '',
    maxAge: 0,
    path: '/',
  })
  return { success: true }
}
