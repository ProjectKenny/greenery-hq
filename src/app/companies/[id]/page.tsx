'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ExternalLink, MapPin, Calendar, Users, Globe, Star, Building2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'

interface CompanyDetail {
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
    description: string
  }
}

export default function CompanyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [company, setCompany] = useState<CompanyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCompany() {
      if (!params.id) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('companies')
          .select(`
            *,
            categories (
              name,
              slug,
              description
            )
          `)
          .eq('id', params.id)
          .eq('status', 'approved')
          .single()

        if (error) {
          setError('Company not found')
          return
        }

        setCompany(data)
      } catch (err) {
        setError('Failed to load company details')
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Directory
          </button>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
            <p className="text-gray-600 mb-6">
              The company you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push('/companies')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse All Companies
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Directory
        </button>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              {company.logo_url ? (
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-2xl">
                    {company.name.charAt(0)}
                  </span>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-2xl">
                    {company.name.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                {company.categories && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {company.categories.name}
                  </span>
                )}
              </div>
            </div>

            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Globe className="h-5 w-5 mr-2" />
                Visit Website
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            )}
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">About {company.name}</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {company.description}
                </p>
              </div>

              {company.categories?.description && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    About {company.categories.name}
                  </h3>
                  <p className="text-green-800">
                    {company.categories.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                {company.headquarters_city && company.headquarters_country && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Headquarters</div>
                      <div className="text-gray-900">{company.headquarters_city}, {company.headquarters_country}</div>
                    </div>
                  </div>
                )}

                {company.founded_year && (
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Founded</div>
                      <div className="text-gray-900">{company.founded_year}</div>
                    </div>
                  </div>
                )}

                {company.employee_count && (
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Company Size</div>
                      <div className="text-gray-900">{company.employee_count} employees</div>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Industry</div>
                    <div className="text-gray-900">{company.categories?.name || 'Green Technology'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                )}
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Star className="h-4 w-4 mr-2" />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
