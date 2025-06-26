'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <Link href={`/companies/${company.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
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
            onClick={(e) => e.stopPropagation()}
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
    </Link>
  )
}



export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyWithCategory[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyWithCategory[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'founded_year' | 'employee_count'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [companiesPerPage] = useState(12)

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

    // Sort companies
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'founded_year':
          aValue = a.founded_year || 0
          bValue = b.founded_year || 0
          break
        case 'employee_count':
          // Convert employee count to numbers for sorting
          const getEmployeeNumber = (count: string) => {
            if (!count) return 0
            if (count.includes('10000+')) return 10000
            if (count.includes('5000-10000')) return 7500
            if (count.includes('1000-5000')) return 3000
            if (count.includes('500-1000')) return 750
            if (count.includes('200-500')) return 350
            if (count.includes('50-200')) return 125
            if (count.includes('11-50')) return 30
            if (count.includes('1-10')) return 5
            return 0
          }
          aValue = getEmployeeNumber(a.employee_count || '')
          bValue = getEmployeeNumber(b.employee_count || '')
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredCompanies(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [companies, searchQuery, selectedCategory, sortBy, sortOrder])

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage)
  const startIndex = (currentPage - 1) * companiesPerPage
  const endIndex = startIndex + companiesPerPage
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex)

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

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder]
                  setSortBy(field)
                  setSortOrder(order)
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="founded_year-desc">Newest First</option>
                <option value="founded_year-asc">Oldest First</option>
                <option value="employee_count-desc">Largest First</option>
                <option value="employee_count-asc">Smallest First</option>
              </select>
            </div>
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
        ) : currentCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} searchQuery={searchQuery} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} companies
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === pageNum
                              ? 'bg-green-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 text-gray-500">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === totalPages
                              ? 'bg-green-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : filteredCompanies.length === 0 && companies.length > 0 ? (
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
