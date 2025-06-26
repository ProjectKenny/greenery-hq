'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Calendar, Users, ExternalLink } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'

interface CompanyWithCategory {
  id: string
  name: string
  description: string
  website?: string
  category_id?: string
  headquarters_city?: string
  headquarters_country?: string
  founded_year?: number
  employee_count?: string
  logo_url?: string
  status: string
  created_at: string
  updated_at: string
  categories?: {
    name: string
    slug: string
  }
}

// Real data fetching functions
async function fetchCompanies(): Promise<CompanyWithCategory[]> {
  try {
    const { data: companies, error } = await supabase
      .from('companies')
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching companies:', error)
      return []
    }

    return companies || []
  } catch (error) {
    console.error('Error fetching companies:', error)
    return []
  }
}

async function fetchCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Helper component for highlighting search terms
function HighlightText({ text, searchQuery }: { text: string; searchQuery: string }) {
  if (!searchQuery.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}

function CompanyCard({ company, searchQuery }: { company: CompanyWithCategory; searchQuery: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {company.logo_url ? (
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-green-600 font-semibold text-lg">
                {company.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold text-lg">
                {company.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              <HighlightText text={company.name} searchQuery={searchQuery} />
            </h3>
            {company.categories && (
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                <HighlightText text={company.categories.name} searchQuery={searchQuery} />
              </span>
            )}
          </div>
        </div>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-600 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        <HighlightText text={company.description} searchQuery={searchQuery} />
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        {company.headquarters_city && company.headquarters_country && (
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>
              <HighlightText text={`${company.headquarters_city}, ${company.headquarters_country}`} searchQuery={searchQuery} />
            </span>
          </div>
        )}
        {company.founded_year && (
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Founded {company.founded_year}</span>
          </div>
        )}
        {company.employee_count && (
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{company.employee_count} employees</span>
          </div>
        )}
      </div>
    </div>
  )
}



export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyWithCategory[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyWithCategory[]>([])

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [companiesData, categoriesData] = await Promise.all([
          fetchCompanies(),
          fetchCategories()
        ])
        setCompanies(companiesData)
        setCategories(categoriesData)
        setFilteredCompanies(companiesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter companies based on search query and category
  useEffect(() => {
    let filtered = companies

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.headquarters_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.headquarters_country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(company => company.category_id === selectedCategory)
    }

    setFilteredCompanies(filtered)
  }, [companies, searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Tech Directory</h1>
          <p className="text-gray-600">
            {loading ? 'Loading companies...' :
             searchQuery || selectedCategory ?
             `Found ${filteredCompanies.length} companies` :
             `Discover ${companies.length}+ companies driving sustainable innovation`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search companies, technologies, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} searchQuery={searchQuery} />
            ))}
          </div>
        ) : companies.length > 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies match your search</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">
              Be the first to add a green tech company to our directory!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
