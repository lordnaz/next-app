'use server'

import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getUserCount() {
  const supabase = await createAdminClient()

  const { data, error } = await supabase.auth.admin.listUsers()
  
  if (error) {
    console.error('Error fetching users:', error)
    return 0
  }

  return data.users.length
}


export async function getUsers() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.auth.admin.listUsers()
  
  if (error) {
    console.error('Error fetching users:', error)
    return []
  }

  return data.users.map(user => ({
    id: user.id,
    email: user.email || '',
    created_at: new Date(user.created_at).toLocaleDateString(),
    last_sign_in_at: user.last_sign_in_at 
      ? new Date(user.last_sign_in_at).toLocaleString('en-MY', { 
          timeZone: 'Asia/Kuala_Lumpur',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      : 'Never',
  }))
}
