import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Mail } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using GreeneryHQ.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing and using GreeneryHQ ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service ("Terms") govern your use of our website located at greeneryhq.com 
                (the "Service") operated by GreeneryHQ Ltd ("us", "we", or "our").
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Description of Service</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>GreeneryHQ is a directory platform that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provides a searchable directory of green technology companies</li>
                <li>Allows companies to submit their information for listing</li>
                <li>Enables users to rate and review companies</li>
                <li>Offers categorized browsing of sustainable technology businesses</li>
                <li>Facilitates connections within the green tech ecosystem</li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
              <p>To access certain features, you may need to create an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptable Use</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>You may use our service for lawful purposes only. You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submit false, misleading, or inaccurate company information</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to scrape or harvest data</li>
                <li>Interfere with the proper functioning of the service</li>
              </ul>
            </div>
          </section>

          {/* Content Submission */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Content Submission</h2>
              <p>When you submit content (company information, reviews, etc.), you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Grant us a license to use, display, and distribute the content</li>
                <li>Represent that you have the right to submit the content</li>
                <li>Agree that the content is accurate and not misleading</li>
                <li>Understand that we may moderate or remove content</li>
                <li>Retain ownership of your original content</li>
              </ul>
            </div>
          </section>

          {/* Company Listings */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Company Listings</h2>
              <p>For company submissions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All information must be accurate and up-to-date</li>
                <li>Companies must have a genuine focus on green technology</li>
                <li>We reserve the right to approve or reject submissions</li>
                <li>Listed companies may be removed for policy violations</li>
                <li>Basic listings are free; premium features may require payment</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Activities</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Creating fake company profiles or reviews</li>
                <li>Spamming or sending unsolicited communications</li>
                <li>Attempting to manipulate search rankings</li>
                <li>Reverse engineering or copying our platform</li>
                <li>Using the service for competitive intelligence gathering</li>
                <li>Posting content that violates third-party rights</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive 
                property of GreeneryHQ Ltd and its licensors. The service is protected by copyright, trademark, 
                and other laws.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without 
                our prior written consent.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
                of the Service, to understand our practices.
              </p>
              <p>
                <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                  View our Privacy Policy →
                </Link>
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimers</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                this Company excludes all representations, warranties, conditions and terms.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not guarantee the accuracy of company information</li>
                <li>We are not responsible for third-party content or links</li>
                <li>Service availability may be interrupted or discontinued</li>
                <li>User-generated content reflects individual opinions</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              <p>
                In no event shall GreeneryHQ Ltd, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your use of the Service.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior 
                notice or liability, under our sole discretion, for any reason whatsoever and without limitation, 
                including but not limited to a breach of the Terms.
              </p>
              <p>
                If you wish to terminate your account, you may simply discontinue using the Service or contact us 
                to request account deletion.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the State of California, United States, 
                without regard to conflict of law provisions.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="space-y-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p>
                What constitutes a material change will be determined at our sole discretion. By continuing to access 
                or use our Service after any revisions become effective, you agree to be bound by the revised terms.
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
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong>Email:</strong> legal@greeneryhq.com</li>
                <li><strong>Contact Form:</strong> <Link href="/contact" className="text-green-600 hover:text-green-700">Contact Page</Link></li>
                <li><strong>Mail:</strong> GreeneryHQ Ltd, San Francisco, CA</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <div className="space-x-6">
            <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
              Privacy Policy
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
