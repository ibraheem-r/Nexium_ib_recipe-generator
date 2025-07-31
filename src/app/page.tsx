'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Utensils, Sparkles, Clock, BookOpen, ArrowRight, Play, Star, Users, Zap } from 'lucide-react'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'

type LoomEmbedProps = {
  src: string
  title?: string
}

const LoomEmbed: React.FC<LoomEmbedProps> = ({ src, title = 'Loom Video' }) => (
  <div className="relative group animate-scale-in">
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-1 rounded-3xl shadow-2xl">
      <div className="aspect-video bg-black rounded-2xl overflow-hidden">
        <iframe
          src={src}
          frameBorder="0"
          allowFullScreen
          title={title}
          className="w-full h-full"
        ></iframe>
      </div>
    </div>

    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
        <Play className="w-8 h-8 text-purple-600" />
      </div>
    </div>
  </div>
)

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }
    getSession()

    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession)
      }
    )

    return () => {
      data.subscription?.unsubscribe()
    }
  }, [supabase.auth])

  const handleGenerateClick = () => {
    if (!session) {
      router.push('/signin')
    } else {
      router.push('/generate')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
      {/* ... other sections remain unchanged ... */}

      {/* Demo Video Section */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-slide-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            See <span className="gradient-text-purple">Culinify</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how easy it is to create amazing recipes with our AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <LoomEmbed src="https://www.loom.com/embed/95e22ff08c6b4844afde60f6b628212b?sid=91234963-f8c7-4dee-8251-69aab1a6d6e6" title="Culinify" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of home chefs who are already creating amazing dishes with Culinify
            </p>
            <Button
              onClick={handleGenerateClick}
              className="group bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 px-6 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text-purple">Culinify</span>
          </div>
          <p className="text-gray-600 mb-4">
            Built with 💜 using Supabase, Next.js, and cutting-edge AI technology
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Culinify. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
