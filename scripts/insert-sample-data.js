const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function insertSampleData() {
  console.log('📝 Inserting sample data...')
  
  try {
    // Insert categories first
    const categories = [
      { name: 'Solar Energy', slug: 'solar-energy', description: 'Companies focused on solar power generation and photovoltaic technology' },
      { name: 'Wind Power', slug: 'wind-power', description: 'Wind energy companies including turbine manufacturers and wind farm developers' },
      { name: 'Electric Vehicles', slug: 'electric-vehicles', description: 'Electric vehicle manufacturers, charging infrastructure, and EV technology' },
      { name: 'Carbon Capture', slug: 'carbon-capture', description: 'Carbon capture, utilization, and storage (CCUS) technology companies' },
      { name: 'Green Finance', slug: 'green-finance', description: 'Financial institutions and fintech companies focused on sustainable investments' },
      { name: 'Sustainable Agriculture', slug: 'sustainable-agriculture', description: 'AgTech companies promoting sustainable farming and food production' },
      { name: 'Energy Storage', slug: 'energy-storage', description: 'Battery technology and energy storage solution providers' },
      { name: 'Green Building', slug: 'green-building', description: 'Sustainable construction materials and green building technology' },
      { name: 'Water Technology', slug: 'water-technology', description: 'Water purification, conservation, and management technology companies' },
      { name: 'Waste Management', slug: 'waste-management', description: 'Recycling, waste-to-energy, and circular economy companies' },
      { name: 'Clean Transportation', slug: 'clean-transportation', description: 'Public transport, logistics, and mobility solutions for sustainability' },
      { name: 'Environmental Monitoring', slug: 'environmental-monitoring', description: 'Companies providing environmental data, monitoring, and analytics' }
    ]

    console.log('📋 Inserting categories...')
    const { data: insertedCategories, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select()

    if (categoryError) {
      console.log('⚠️  Category error:', categoryError.message)
      // Try to get existing categories
      const { data: existingCategories } = await supabase.from('categories').select('*')
      console.log(`📊 Found ${existingCategories?.length || 0} existing categories`)
    } else {
      console.log(`✅ Inserted ${insertedCategories?.length || 0} categories`)
    }

    // Get all categories for company insertion
    const { data: allCategories } = await supabase.from('categories').select('id, slug')
    const categoryMap = {}
    allCategories?.forEach(cat => {
      categoryMap[cat.slug] = cat.id
    })

    // Insert sample companies
    const sampleCompanies = [
      {
        name: 'Tesla Energy',
        description: 'Leading electric vehicle manufacturer and clean energy company developing solar panels, energy storage systems, and sustainable transport solutions.',
        website: 'https://www.tesla.com/energy',
        category_id: categoryMap['electric-vehicles'],
        headquarters_city: 'Austin',
        headquarters_country: 'United States',
        founded_year: 2003,
        employee_count: '10000+',
        status: 'approved'
      },
      {
        name: 'Vestas Wind Systems',
        description: 'Global leader in wind energy solutions, manufacturing and installing wind turbines worldwide with focus on sustainable energy generation.',
        website: 'https://www.vestas.com',
        category_id: categoryMap['wind-power'],
        headquarters_city: 'Aarhus',
        headquarters_country: 'Denmark',
        founded_year: 1945,
        employee_count: '10000+',
        status: 'approved'
      },
      {
        name: 'First Solar',
        description: 'Leading global provider of comprehensive photovoltaic solar solutions using advanced thin-film semiconductor technology.',
        website: 'https://www.firstsolar.com',
        category_id: categoryMap['solar-energy'],
        headquarters_city: 'Tempe',
        headquarters_country: 'United States',
        founded_year: 1999,
        employee_count: '5000-10000',
        status: 'approved'
      },
      {
        name: 'Climeworks',
        description: 'Pioneer in direct air capture technology, removing CO2 from the atmosphere and turning it into useful products or storing it permanently.',
        website: 'https://www.climeworks.com',
        category_id: categoryMap['carbon-capture'],
        headquarters_city: 'Zurich',
        headquarters_country: 'Switzerland',
        founded_year: 2009,
        employee_count: '200-500',
        status: 'approved'
      },
      {
        name: 'Beyond Meat',
        description: 'Plant-based meat company creating sustainable protein alternatives to reduce environmental impact of traditional animal agriculture.',
        website: 'https://www.beyondmeat.com',
        category_id: categoryMap['sustainable-agriculture'],
        headquarters_city: 'El Segundo',
        headquarters_country: 'United States',
        founded_year: 2009,
        employee_count: '1000-5000',
        status: 'approved'
      },
      {
        name: 'Northvolt',
        description: 'European battery manufacturer focused on sustainable lithium-ion batteries for electric vehicles and energy storage systems.',
        website: 'https://www.northvolt.com',
        category_id: categoryMap['energy-storage'],
        headquarters_city: 'Stockholm',
        headquarters_country: 'Sweden',
        founded_year: 2016,
        employee_count: '1000-5000',
        status: 'approved'
      },
      {
        name: 'Ørsted',
        description: 'Danish renewable energy company and global leader in offshore wind power development and green energy solutions.',
        website: 'https://www.orsted.com',
        category_id: categoryMap['wind-power'],
        headquarters_city: 'Fredericia',
        headquarters_country: 'Denmark',
        founded_year: 1972,
        employee_count: '5000-10000',
        status: 'approved'
      },
      {
        name: 'Rivian',
        description: 'Electric vehicle manufacturer focused on electric trucks and delivery vehicles for sustainable transportation solutions.',
        website: 'https://www.rivian.com',
        category_id: categoryMap['electric-vehicles'],
        headquarters_city: 'Irvine',
        headquarters_country: 'United States',
        founded_year: 2009,
        employee_count: '10000+',
        status: 'approved'
      }
    ]

    console.log('🏢 Inserting companies...')
    const { data: insertedCompanies, error: companyError } = await supabase
      .from('companies')
      .insert(sampleCompanies)
      .select()

    if (companyError) {
      console.log('⚠️  Company error:', companyError.message)
      const { data: existingCompanies } = await supabase.from('companies').select('*')
      console.log(`🏢 Found ${existingCompanies?.length || 0} existing companies`)
    } else {
      console.log(`✅ Inserted ${insertedCompanies?.length || 0} companies`)
    }

    // Final verification
    const { data: finalCategories } = await supabase.from('categories').select('id')
    const { data: finalCompanies } = await supabase.from('companies').select('id')

    console.log('\n🎉 Sample data insertion completed!')
    console.log(`📊 Total Categories: ${finalCategories?.length || 0}`)
    console.log(`🏢 Total Companies: ${finalCompanies?.length || 0}`)

  } catch (error) {
    console.error('❌ Data insertion failed:', error.message)
  }
}

insertSampleData()
