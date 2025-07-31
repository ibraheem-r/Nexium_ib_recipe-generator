'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const session = useSession()
  const router = useRouter()

  const handleGenerateClick = () => {
    if (!session) {
      router.push('/signin')
    } else {
      router.push('/generate')
    }
  }

  return (
    <main className="bg-gradient-to-br from-rose-100 via-white to-indigo-100 min-h-screen text-gray-800">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white/70 backdrop-blur sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-purple-800">
          <Link href="/">Culinify</Link>
        </h1>
        <div>
          <Link href="/signin">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-purple-800 drop-shadow-sm">
          Culinify
        </h1>
        <p className="text-lg mt-4 max-w-xl mx-auto text-gray-700">
          Your personal AI-powered recipe creator. Describe what you have, and we will cook up the perfect dish for you.
        </p>
        <Button
          onClick={handleGenerateClick}
          className="mt-6 px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition-all duration-300"
        >
          Generate a Recipe
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-10 py-16 max-w-6xl mx-auto">
        {[
          {
            title: 'Smart Suggestions',
            desc: 'AI tailors unique recipes based on your input.',
          },
          {
            title: 'Save History',
            desc: 'Access your past recipes anytime from your dashboard.',
          },
          {
            title: 'Quick & Easy',
            desc: 'Get complete recipes in under 30 seconds.',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-md border border-purple-100 p-6 rounded-xl shadow-sm text-center"
          >
            <h3 className="text-xl font-semibold text-purple-700">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">
          {[
            'Describe your ingredients or cravings.',
            'Our AI generates a custom recipe.',
            'Save and revisit your favorites!',
          ].map((step, i) => (
            <div
              key={i}
              className="bg-purple-50 p-6 rounded-xl shadow text-gray-700 hover:shadow-md transition"
            >
              <span className="text-4xl font-bold text-purple-600">{i + 1}</span>
              <p className="mt-4">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Loom Video Section */}
      <section className="py-16 bg-indigo-100 text-center px-4">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Watch Culinify in Action</h2>
        <div className="max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="640"
              height="348"
              src="https://www.loom.com/embed/457b96dec59f422ba4ea265119078a28?sid=bc4e0da2-6979-4f22-a783-0cd954079b1e"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-md"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-indigo-50">
        <h2 className="text-3xl font-bold text-indigo-800">
          Start your culinary adventure today!
        </h2>
        <Button
          onClick={handleGenerateClick}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-md"
        >
          Generate Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 Culinify. Built with 💜 using Supabase, Next.js, and n8n.
      </footer>
    </main>
  )
}
