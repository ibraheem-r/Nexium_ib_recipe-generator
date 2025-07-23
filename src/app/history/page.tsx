'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-screen px-6 py-10 bg-gradient-to-tr from-yellow-50 via-white to-rose-100">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-rose-600">📚 Recipe History</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found.</p>
        ) : (
          <ul className="space-y-4">
            {recipes.map((r) => (
              <li
                key={r.id}
                className="p-5 bg-white rounded-xl shadow-md border border-rose-200"
              >
                <p className="text-gray-800 whitespace-pre-line">{r.recipe}</p>
                <p className="text-sm text-right text-gray-400 mt-2">
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
