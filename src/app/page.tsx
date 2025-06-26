import { Leaf, Search, Filter, Plus } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">GreeneryHQ</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/companies" className="text-gray-700 hover:text-green-600 font-medium">Directory</Link>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Categories</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Submit Company</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Green Tech Companies
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The comprehensive directory of companies driving climate solutions, renewable energy, and sustainable innovation worldwide.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies, technologies, or locations..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Solar Energy', 'Wind Power', 'Electric Vehicles', 'Carbon Capture', 'Green Finance', 'Sustainable Agriculture'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Browse Directory Button */}
          <div className="text-center">
            <Link
              href="/companies"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Directory
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
              <div key={category.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
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
            Join the directory and connect with the global green tech community
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Submit Your Company
          </button>
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
                <li><a href="#" className="hover:text-white">Browse Companies</a></li>
                <li><a href="#" className="hover:text-white">Categories</a></li>
                <li><a href="#" className="hover:text-white">Search</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Submit Company</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GreeneryHQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
