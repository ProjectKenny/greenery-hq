import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Company {
  id: string
  name: string
  description: string
  website: string
  category_id: string
  headquarters_city: string
  headquarters_country: string
  founded_year: number
  employee_count: string
  logo_url?: string
  created_at: string
  updated_at: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon_url?: string
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  display_name: string
  bio?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Rating {
  id: string
  company_id: string
  user_id: string
  rating: number
  review?: string
  created_at: string
}
