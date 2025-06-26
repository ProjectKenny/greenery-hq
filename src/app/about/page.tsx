import { Leaf, Target, Users, Globe, Zap, Heart } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About GreeneryHQ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the world's most comprehensive directory of green technology companies, 
            connecting innovators who are solving our planet's greatest challenges.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            GreeneryHQ exists to accelerate the global transition to sustainable technology by making it easier 
            to discover, connect with, and support companies that are creating positive environmental impact. 
            We believe that by bringing together the green tech ecosystem, we can amplify the collective impact 
            of innovation in climate solutions, renewable energy, and sustainable practices.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Global Impact</h3>
            </div>
            <p className="text-gray-600">
              We showcase companies from around the world, recognizing that climate solutions require 
              global collaboration and diverse perspectives.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Innovation Focus</h3>
            </div>
            <p className="text-gray-600">
              We celebrate cutting-edge technologies and breakthrough innovations that are reshaping 
              industries for a sustainable future.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Community Driven</h3>
            </div>
            <p className="text-gray-600">
              Our directory grows through community contributions, ensuring it reflects the real 
              landscape of green technology innovation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Purpose Driven</h3>
            </div>
            <p className="text-gray-600">
              Every company in our directory shares a commitment to environmental sustainability 
              and positive planetary impact.
            </p>
          </div>
        </div>

        {/* What We Cover */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Solar Energy',
              'Wind Power',
              'Electric Vehicles',
              'Carbon Capture',
              'Green Finance',
              'Sustainable Agriculture',
              'Energy Storage',
              'Green Building',
              'Water Technology',
              'Waste Management',
              'Clean Transportation',
              'Environmental Monitoring'
            ].map((category) => (
              <div key={category} className="flex items-center p-3 bg-green-50 rounded-lg">
                <Leaf className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-100">Companies Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-green-100">Countries Represented</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-green-100">Technology Categories</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover</h3>
                <p className="text-gray-600">
                  Browse our comprehensive directory of green tech companies across multiple categories and regions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect</h3>
                <p className="text-gray-600">
                  Access detailed company profiles with contact information, technology focus, and impact metrics.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contribute</h3>
                <p className="text-gray-600">
                  Help grow the ecosystem by submitting companies, rating solutions, and sharing insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Green Tech Movement</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a startup, investor, researcher, or simply passionate about sustainability, 
            GreeneryHQ is your gateway to the green technology ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/companies"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Explore Directory
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Submit Your Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
