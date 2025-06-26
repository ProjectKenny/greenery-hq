const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function fixRLSAndInsertData() {
  console.log('🔧 Fixing RLS policies and inserting sample data...')
  
  try {
    // First, let's check current data
    console.log('📊 Checking current data...')
    const { data: existingCategories } = await supabase.from('categories').select('*')
    const { data: existingCompanies } = await supabase.from('companies').select('*')
    
    console.log(`📋 Found ${existingCategories?.length || 0} categories`)
    console.log(`🏢 Found ${existingCompanies?.length || 0} companies`)

    // If we have categories but no companies, let's insert companies
    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ Categories already exist, proceeding with companies...')
      
      // Create a mapping of category slugs to IDs
      const categoryMap = {}
      existingCategories.forEach(cat => {
        categoryMap[cat.slug] = cat.id
      })

      // Sample companies data
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
        },
        {
          name: 'Sunrun',
          description: 'Leading residential solar energy company providing solar panel installation and energy storage solutions for homeowners.',
          website: 'https://www.sunrun.com',
          category_id: categoryMap['solar-energy'],
          headquarters_city: 'San Francisco',
          headquarters_country: 'United States',
          founded_year: 2007,
          employee_count: '5000-10000',
          status: 'approved'
        },
        {
          name: 'ChargePoint',
          description: 'Electric vehicle charging network company providing charging solutions for electric cars and commercial fleets.',
          website: 'https://www.chargepoint.com',
          category_id: categoryMap['electric-vehicles'],
          headquarters_city: 'Campbell',
          headquarters_country: 'United States',
          founded_year: 2007,
          employee_count: '1000-5000',
          status: 'approved'
        }
      ]

      console.log('🏢 Inserting companies using service role...')
      
      // Insert companies one by one to handle any individual failures
      let successCount = 0
      for (const company of sampleCompanies) {
        try {
          const { data, error } = await supabase
            .from('companies')
            .insert([company])
            .select()

          if (error) {
            console.log(`⚠️  Failed to insert ${company.name}:`, error.message)
          } else {
            console.log(`✅ Inserted: ${company.name}`)
            successCount++
          }
        } catch (err) {
          console.log(`❌ Error inserting ${company.name}:`, err.message)
        }
      }

      console.log(`\n🎉 Successfully inserted ${successCount} companies!`)

      // Final verification
      const { data: finalCompanies } = await supabase.from('companies').select('*')
      console.log(`📊 Total companies in database: ${finalCompanies?.length || 0}`)

      if (finalCompanies && finalCompanies.length > 0) {
        console.log('\n✅ Sample companies:')
        finalCompanies.slice(0, 3).forEach(company => {
          console.log(`   • ${company.name} (${company.headquarters_country})`)
        })
      }

    } else {
      console.log('❌ No categories found. Please run the SQL schema first.')
      console.log('📋 Go to: https://supabase.com/dashboard/project/swpulyoiilxmyqbzzyay/sql')
      console.log('📄 Run the contents of: supabase-schema.sql')
    }

  } catch (error) {
    console.error('❌ Failed to insert data:', error.message)
    console.log('\n🔧 Troubleshooting steps:')
    console.log('1. Verify Supabase service role key is correct')
    console.log('2. Check that RLS policies allow service role access')
    console.log('3. Ensure database schema has been run')
  }
}

fixRLSAndInsertData()
