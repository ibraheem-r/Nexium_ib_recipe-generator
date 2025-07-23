'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Recipe = {
  recipe: string
}


export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  
  const supabase = createClientComponentClient()

const handleSignOut = async () => {
  await supabase.auth.signOut()
  router.push('/')
}


const handleGenerate = async () => {
    setLoading(true)
  
    try {
      // 🔐 Get the real user
      const { data: { user } } = await supabase.auth.getUser()
  
      if (!user) {
        throw new Error('User not authenticated')
      }
  
      const userId = user.id
  
      // 🧠 Call your AI generation API
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userId }),
      })
  
      if (!response.ok) throw new Error('Failed to generate recipe')
  
      const data: Recipe = await response.json()
      setGeneratedRecipe(data.recipe)
  
     
      await fetch('/api/save-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe: data.recipe, userId }),
      })
  
    } catch (err) {
      console.error('Error generating or saving recipe:', err)
      setGeneratedRecipe('Error generating recipe.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-white px-4 py-20">
      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-purple-200 space-y-8 animate-fade-in">
      <div className="flex justify-end">
  <Button onClick={handleSignOut} variant="outline" className="text-sm">
    Sign Out
  </Button>
</div>
<div className="flex justify-end">
<Link
  href="/history"
  className="text-indigo-600 hover:underline text-sm font-medium"
>
  📚 View History
</Link>
</div>

        <h1 className="text-4xl font-extrabold text-center text-purple-700 drop-shadow-md tracking-tight">
           Culinify
        </h1>

        <Textarea
          placeholder="Describe ingredients or the kind of recipe you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] p-4 rounded-2xl border border-purple-200 shadow-inner bg-white/80 focus:ring-2 focus:ring-purple-400 transition"
        />

        <div className="text-center">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-purple-300/40 transition-all duration-300"
          >
            {loading ? 'Flavour engineering...' : 'Craft a Dish'}
          </Button>
        </div>

        {generatedRecipe && (
          <div className="bg-white/80 border border-purple-300 p-6 rounded-2xl shadow-lg transition-all duration-300 animate-fade-in">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              🍽️ Your Recipe:
            </h2>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {generatedRecipe}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
