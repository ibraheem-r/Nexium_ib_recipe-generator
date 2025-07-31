'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Utensils, Sparkles, Clock, BookOpen, ArrowRight, Play, Star, Users, Zap } from 'lucide-react'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'

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
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <Link href="/" className="group">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text-purple">Culinify</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/signin">
            <Button className="bg-white/80 backdrop-blur-sm hover:bg-white text-purple-700 border border-purple-200 px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Recipe Generation</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text-purple">Transform</span>
            <br />
            <span className="text-gray-800">Your Ingredients</span>
            <br />
            <span className="gradient-text-purple">Into Magic</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Describe what you have, and our AI will craft the perfect recipe just for you. 
            From simple ingredients to culinary masterpieces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleGenerateClick}
              className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm">4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm">10k+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose <span className="gradient-text-purple">Culinify</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of recipe creation with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'AI-Powered Magic',
              desc: 'Our advanced AI understands your ingredients and creates unique, delicious recipes tailored to your taste.',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: Clock,
              title: 'Lightning Fast',
              desc: 'Get complete recipes with ingredients, instructions, and cooking tips in under 30 seconds.',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: BookOpen,
              title: 'Recipe Library',
              desc: 'Save and organize your favorite recipes. Build your personal culinary collection over time.',
              color: 'from-green-500 to-emerald-500'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It <span className="gradient-text-purple">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to culinary perfection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Ingredients',
                desc: 'Tell us what you have in your kitchen or what you\'re craving.',
                icon: '🥬'
              },
              {
                step: '02',
                title: 'AI Creates Your Recipe',
                desc: 'Our AI analyzes your input and generates a personalized recipe.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Cook & Enjoy',
                desc: 'Follow the detailed instructions and savor your creation!',
                icon: '🍽️'
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-3xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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

  <div className="max-w-4xl mx-auto relative group">
    <video
      controls
      playsInline
      preload="metadata"
      poster="/videos/poster.png"
      className="w-full rounded-xl shadow-lg"
      src="/videos/culinify-demo.mp4"
    >
      Your browser does not support the video tag.
    </video>

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
        <Play className="w-8 h-8 text-purple-600" />
      </div>
    </div>
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
