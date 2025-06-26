'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building2, ArrowRight, Search } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  company_count?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      
      // Get categories with company counts
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (categoriesError) throw categoriesError

      // Get company counts for each category
      const categoriesWithCounts = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { count, error } = await supabase
            .from('companies')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('status', 'approved')

          if (error) {
            console.error('Error counting companies for category:', category.name, error)
            return { ...category, company_count: 0 }
          }

          return { ...category, company_count: count || 0 }
        })
      )

      setCategories(categoriesWithCounts)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Green Tech Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore companies across different sectors of green technology and sustainable innovation.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/companies?category=${category.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group-hover:border-green-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{category.company_count || 0} companies</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>

                {/* Progress bar showing relative size */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, ((category.company_count || 0) / Math.max(...categories.map(c => c.company_count || 0))) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms to find what you're looking for.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Directory Statistics</h2>
            <p className="text-gray-600">Overview of companies across all green tech categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.reduce((sum, cat) => sum + (cat.company_count || 0), 0)}
              </div>
              <div className="text-gray-600">Total Companies</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.filter(cat => (cat.company_count || 0) > 0).length}
              </div>
              <div className="text-gray-600">Active Categories</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(categories.reduce((sum, cat) => sum + (cat.company_count || 0), 0) / categories.filter(cat => (cat.company_count || 0) > 0).length) || 0}
              </div>
              <div className="text-gray-600">Avg per Category</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Don't see your category?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              We're always expanding our directory. Submit your green tech company and help us grow the ecosystem.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Submit Your Company
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
