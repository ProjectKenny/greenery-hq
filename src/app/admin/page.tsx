'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Eye, Clock, Building2, MapPin, Calendar, Users, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface PendingCompany {
  id: string
  name: string
  description: string
  website?: string
  category_id?: string
  headquarters_city?: string
  headquarters_country?: string
  founded_year?: number
  employee_count?: string
  status: string
  created_at: string
  submitted_by: string
  categories?: {
    name: string
    slug: string
  }
  profiles?: {
    display_name: string
    id: string
  }
}

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [pendingCompanies, setPendingCompanies] = useState<PendingCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<PendingCompany | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/auth/login?redirect=/admin')
        return
      }
      if (profile?.role !== 'admin') {
        router.push('/companies')
        return
      }
      fetchPendingCompanies()
    }
  }, [user, profile, authLoading, router])

  const fetchPendingCompanies = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('companies')
        .select(`
          *,
          categories (
            name,
            slug
          ),
          profiles (
            display_name,
            id
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPendingCompanies(data || [])
    } catch (error) {
      console.error('Error fetching pending companies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (companyId: string) => {
    try {
      setActionLoading(companyId)
      const { error } = await supabase
        .from('companies')
        .update({ status: 'approved' })
        .eq('id', companyId)

      if (error) throw error
      
      // Remove from pending list
      setPendingCompanies(prev => prev.filter(company => company.id !== companyId))
      setSelectedCompany(null)
    } catch (error) {
      console.error('Error approving company:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (companyId: string) => {
    try {
      setActionLoading(companyId)
      const { error } = await supabase
        .from('companies')
        .update({ status: 'rejected' })
        .eq('id', companyId)

      if (error) throw error
      
      // Remove from pending list
      setPendingCompanies(prev => prev.filter(company => company.id !== companyId))
      setSelectedCompany(null)
    } catch (error) {
      console.error('Error rejecting company:', error)
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user || profile?.role !== 'admin') {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Review and manage company submissions to the GreeneryHQ directory.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{pendingCompanies.length}</div>
                <div className="text-sm text-gray-500">Pending Review</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">-</div>
                <div className="text-sm text-gray-500">Approved Today</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">-</div>
                <div className="text-sm text-gray-500">Total Companies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Companies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Company Submissions</h2>
          </div>
          
          {pendingCompanies.length === 0 ? (
            <div className="p-8 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending submissions</h3>
              <p className="text-gray-600">All company submissions have been reviewed.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pendingCompanies.map((company) => (
                <div key={company.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        {company.categories && (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {company.categories.name}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        {company.headquarters_city && company.headquarters_country && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{company.headquarters_city}, {company.headquarters_country}</span>
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
                        {company.website && (
                          <div className="flex items-center space-x-1">
                            <Globe className="h-4 w-4" />
                            <a 
                              href={company.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Submitted by: {company.profiles?.display_name || 'Unknown'} • {new Date(company.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        onClick={() => setSelectedCompany(company)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      
                      <button
                        onClick={() => handleApprove(company.id)}
                        disabled={actionLoading === company.id}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      
                      <button
                        onClick={() => handleReject(company.id)}
                        disabled={actionLoading === company.id}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-900">{selectedCompany.description}</p>
                </div>
                
                {selectedCompany.categories && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      {selectedCompany.categories.name}
                    </span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {selectedCompany.headquarters_city && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Location</h3>
                      <p className="text-gray-900">{selectedCompany.headquarters_city}, {selectedCompany.headquarters_country}</p>
                    </div>
                  )}
                  
                  {selectedCompany.founded_year && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Founded</h3>
                      <p className="text-gray-900">{selectedCompany.founded_year}</p>
                    </div>
                  )}
                  
                  {selectedCompany.employee_count && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Company Size</h3>
                      <p className="text-gray-900">{selectedCompany.employee_count} employees</p>
                    </div>
                  )}
                  
                  {selectedCompany.website && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Website</h3>
                      <a 
                        href={selectedCompany.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700"
                      >
                        {selectedCompany.website}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => handleReject(selectedCompany.id)}
                    disabled={actionLoading === selectedCompany.id}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedCompany.id)}
                    disabled={actionLoading === selectedCompany.id}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
