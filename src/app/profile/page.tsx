'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Building2, Save, Edit3 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface UserCompany {
  id: string
  name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  categories?: {
    name: string
  }
}

export default function ProfilePage() {
  const { user, profile, updateProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userCompanies, setUserCompanies] = useState<UserCompany[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/profile')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
      })
    }
  }, [profile])

  useEffect(() => {
    if (user) {
      fetchUserCompanies()
    }
  }, [user])

  const fetchUserCompanies = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          status,
          created_at,
          categories (
            name
          )
        `)
        .eq('submitted_by', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setUserCompanies(data || [])
    } catch (error) {
      console.error('Error fetching user companies:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await updateProfile(formData)
      
      if (error) throw error
      
      setSuccess('Profile updated successfully!')
      setEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending Review'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your account information and view your company submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Email address cannot be changed. Contact support if needed.
                  </p>
                </div>

                {/* Display Name */}
                <div>
                  <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="display_name"
                      name="display_name"
                      value={formData.display_name}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your display name"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us about yourself and your interest in green technology..."
                  />
                </div>

                {/* Account Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profile ? new Date(profile.created_at).toLocaleDateString() : ''}
                      disabled
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                {editing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false)
                        setFormData({
                          display_name: profile?.display_name || '',
                          bio: profile?.bio || '',
                        })
                        setError(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{profile?.display_name || 'User'}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                {profile?.role === 'admin' && (
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Administrator
                  </span>
                )}
              </div>
            </div>

            {/* Company Submissions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Submissions</h3>
              
              {userCompanies.length === 0 ? (
                <div className="text-center py-4">
                  <Building2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No companies submitted yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userCompanies.map((company) => (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{company.name}</h4>
                          {company.categories && (
                            <p className="text-xs text-gray-500">{company.categories.name}</p>
                          )}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(company.status)}`}>
                          {getStatusText(company.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted {new Date(company.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
