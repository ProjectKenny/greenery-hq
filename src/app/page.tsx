'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, Search, Plus } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/companies?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/companies')
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/companies?search=${encodeURIComponent(category)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
              🌱 Discover the Future of Green Technology
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            The World's Leading
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Tech Directory
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with innovative companies driving climate solutions, renewable energy, and sustainable technology worldwide.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-green-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies, technologies, or locations..."
                className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['Solar Energy', 'Wind Power', 'Electric Vehicles', 'Carbon Capture', 'Green Finance', 'Sustainable Agriculture'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm text-green-700 rounded-full border-2 border-green-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Browse Directory Button */}
          <div className="text-center">
            <Link
              href="/companies"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-xl"
            >
              <Search className="h-6 w-6 mr-3" />
              Browse Directory
              <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Green Tech Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">12</div>
              <div className="text-gray-600">Industry Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Solar Energy', count: '120+ companies', color: 'bg-yellow-100 text-yellow-800' },
              { name: 'Wind Power', count: '85+ companies', color: 'bg-blue-100 text-blue-800' },
              { name: 'Electric Vehicles', count: '95+ companies', color: 'bg-purple-100 text-purple-800' },
              { name: 'Carbon Capture', count: '45+ companies', color: 'bg-gray-100 text-gray-800' },
              { name: 'Green Finance', count: '60+ companies', color: 'bg-green-100 text-green-800' },
              { name: 'Sustainable Agriculture', count: '75+ companies', color: 'bg-emerald-100 text-emerald-800' },
            ].map((category) => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-gray-600">{category.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Add Your Green Tech Company
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join & Connect with our growing green tech community
          </p>
          <Link href="/submit" className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Submit Your Company
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">GreeneryHQ</span>
              </div>
              <p className="text-gray-400">
                The comprehensive directory of green technology companies worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Directory</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/companies" className="hover:text-white">Browse Companies</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/companies" className="hover:text-white">Search</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/submit" className="hover:text-white">Submit Company</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024-2025 GreeneryHQ Ltd. All rights reserved. Made with ❤️ by <a href="https://kennytan.net" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">KennyTan.net</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
