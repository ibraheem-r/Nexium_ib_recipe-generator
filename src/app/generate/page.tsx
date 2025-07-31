'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Copy } from 'lucide-react'

type Recipe = {
  recipe: string
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleGenerate = async () => {
    setLoading(true)
    setGeneratedRecipe(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) throw new Error('User not authenticated')

      const userId = user.id

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
      setGeneratedRecipe('❌ Error generating recipe.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedRecipe) {
      navigator.clipboard.writeText(generatedRecipe)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200 p-8 sm:p-12 space-y-8 animate-fade-in">

        <div className="flex justify-between items-center text-sm">
          <Link
            href="/history"
            className="text-indigo-600 hover:underline font-medium"
          >
            ← View History
          </Link>
          <Button onClick={handleSignOut} variant="outline" className="text-sm">
            Sign Out
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 tracking-tight drop-shadow">
             Culinify
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Just type your cravings or available ingredients and we’ll craft a delicious recipe just for you!
          </p>
        </div>

        <Textarea
          placeholder="E.g., Chicken, rice, spinach... or 'I want something spicy and quick!'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[140px] p-5 rounded-2xl border border-purple-300 shadow-inner bg-white focus:ring-2 focus:ring-purple-400 transition"
        />

        <div className="text-center">
          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Flavour engineering...' : generatedRecipe ? 'Regenerate Recipe' : 'Craft a Dish'}
          </Button>
        </div>

        {generatedRecipe && (
          <div className="bg-white border border-purple-300 p-6 rounded-2xl shadow-md transition-all animate-fade-in space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-purple-700">
                🍽️ Your Recipe
              </h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {generatedRecipe}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
