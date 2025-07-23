'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fffaf5] to-[#ffeaea] dark:from-[#1a1a1a] dark:to-[#2c2c2c] px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to <span className="text-pink-600">Culinify</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          AI-powered recipe inspiration — generate unique and delicious meals with just a few clicks.
        </p>
      </header>

      <main className="flex flex-col sm:flex-row gap-4">
        <Link href="/generate">
          <Button className="rounded-full px-6 py-3 text-lg font-medium bg-pink-600 hover:bg-pink-700 text-white shadow-md transition">
            🍳 Generate a Recipe
          </Button>
        </Link>

        <Link href="/signin">
          <Button
            variant="outline"
            className="rounded-full px-6 py-3 text-lg font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            🔐 Sign In
          </Button>
        </Link>
      </main>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Culinify. All rights reserved.
      </footer>
    </div>
  )
}
