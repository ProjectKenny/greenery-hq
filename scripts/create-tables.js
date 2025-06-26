const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTables() {
  console.log('🚀 Creating GreeneryHQ database tables...')
  
  try {
    // Create categories table
    console.log('📋 Creating categories table...')
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(100) NOT NULL UNIQUE,
          slug VARCHAR(100) NOT NULL UNIQUE,
          description TEXT,
          icon_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Create companies table
    console.log('🏢 Creating companies table...')
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS companies (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(200) NOT NULL,
          description TEXT NOT NULL,
          website VARCHAR(500),
          category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
          headquarters_city VARCHAR(100),
          headquarters_country VARCHAR(100),
          founded_year INTEGER CHECK (founded_year > 1800 AND founded_year <= EXTRACT(YEAR FROM NOW())),
          employee_count VARCHAR(50),
          logo_url TEXT,
          status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
        );
      `
    })

    // Insert sample categories
    console.log('📝 Inserting sample categories...')
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

    const { error: categoryError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' })
    if (categoryError) {
      console.log('⚠️  Categories may already exist:', categoryError.message)
    }

    // Insert sample companies
    console.log('🏢 Inserting sample companies...')
    
    // Get category IDs for reference
    const { data: categoryData } = await supabase.from('categories').select('id, slug')
    const categoryMap = {}
    categoryData?.forEach(cat => {
      categoryMap[cat.slug] = cat.id
    })

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
      }
    ]

    const { error: companyError } = await supabase.from('companies').upsert(sampleCompanies, { onConflict: 'name' })
    if (companyError) {
      console.log('⚠️  Companies may already exist:', companyError.message)
    }

    // Verify setup
    const { data: categoriesCount } = await supabase.from('categories').select('id')
    const { data: companiesCount } = await supabase.from('companies').select('id')

    console.log('✅ Database setup completed successfully!')
    console.log(`📊 Categories: ${categoriesCount?.length || 0}`)
    console.log(`🏢 Companies: ${companiesCount?.length || 0}`)
    console.log('\n🎉 Ready for development!')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.log('\n📋 Manual setup required:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy and paste the contents of supabase-schema.sql')
    console.log('4. Run the SQL to create all tables')
  }
}

createTables()
