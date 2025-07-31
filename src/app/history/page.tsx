'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Recipe = {
  id: number
  recipe: string
  created_at: string
}

export default function HistoryPage() {
  const supabase = createClientComponentClient()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchRecipes = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      router.push('/')
      return
    }

    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setRecipes(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-tr from-yellow-50 via-white to-rose-100">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-rose-200 animate-fade-in space-y-8">

        <div className="flex justify-between items-center">
          <Link href="/generate" className="text-rose-600 hover:underline text-sm font-medium">
             Generate New Recipe
          </Link>
          <Button onClick={handleSignOut} variant="outline" className="text-sm">
            Sign Out
          </Button>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-rose-600 tracking-tight drop-shadow-sm">
          📚 Your Recipe History
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Fetching your culinary masterpieces...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No saved recipes yet. Go cook something!</p>
        ) : (
          <ul className="space-y-6">
            {recipes.map((r) => (
              <li
                key={r.id}
                className="p-6 bg-white/90 rounded-2xl shadow-md border border-rose-300 animate-fade-in"
              >
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">{r.recipe}</p>
                <p className="text-sm text-right text-gray-400 mt-3">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
