'use server'
import { logout } from '@/lib/Auth'

export async function handleLogout() {
  return logout({})
}
