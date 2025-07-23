import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// No arguments needed here:
export const supabaseBrowser = () => createPagesBrowserClient()

// Server-side usage is fine as-is:
export const supabaseServer = () => createServerComponentClient({ cookies })
