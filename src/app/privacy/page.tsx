import { Shield, Eye, Lock, Users, Database, Mail } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address when you create an account</li>
                <li>Company information when you submit a listing</li>
                <li>Profile information you choose to provide</li>
                <li>Communications you send to us</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Device and operating system information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our directory service</li>
                <li>Process company submissions and user accounts</li>
                <li>Send important updates about our service</li>
                <li>Improve our website and user experience</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Public Directory:</strong> Company information you submit is displayed publicly</li>
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our service</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting infrastructure</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                While we strive to protect your information, no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please <Link href="/contact" className="text-green-600 hover:text-green-700">contact us</Link>.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p>You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.</p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
              <p>Our website may contain links to third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Authentication:</strong> Google and GitHub for login</li>
                <li><strong>Analytics:</strong> Supabase Analytics for usage insights</li>
                <li><strong>Hosting:</strong> Vercel for website hosting</li>
              </ul>
              <p>These services have their own privacy policies, which we encourage you to review.</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* International Users */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">International Users</h2>
              <p>
                If you are accessing our service from outside the United States, please note that your information 
                may be transferred to and processed in the United States, where our servers are located.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <div className="text-gray-700">
              <p className="mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong>Email:</strong> privacy@greeneryhq.com</li>
                <li><strong>Contact Form:</strong> <Link href="/contact" className="text-green-600 hover:text-green-700">Contact Page</Link></li>
                <li><strong>Mail:</strong> GreeneryHQ Ltd, San Francisco, CA</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <div className="space-x-6">
            <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
              Contact Us
            </Link>
            <Link href="/about" className="text-green-600 hover:text-green-700 font-medium">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
