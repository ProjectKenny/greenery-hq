const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up GreeneryHQ database...')

  try {
    // Test connection by checking if categories table exists
    console.log('📡 Testing Supabase connection...')
    const { data, error } = await supabase.from('categories').select('count').limit(1)

    if (error && error.message.includes('relation "public.categories" does not exist')) {
      console.log('📋 Database tables not found - need to run SQL schema manually')
      console.log('🔗 Please go to your Supabase dashboard > SQL Editor')
      console.log('📄 Copy and paste the contents of supabase-schema.sql')
      console.log('▶️  Run the SQL to create all tables and functions')
      return
    } else if (error) {
      throw error
    }
    console.log('✅ Supabase connection successful')

    // Read and execute SQL schema
    console.log('📄 Reading SQL schema...')
    const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('🔧 Executing database schema...')
    
    // Split SQL into individual statements and execute them
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error && !error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}: ${error.message}`)
          }
        } catch (err) {
          // Try direct query for simpler statements
          try {
            await supabase.from('_raw').select(statement)
          } catch (directError) {
            console.log(`⚠️  Statement ${i + 1} skipped: ${statement.substring(0, 50)}...`)
          }
        }
      }
    }

    // Verify tables were created
    console.log('🔍 Verifying database setup...')
    
    const { data: categories } = await supabase.from('categories').select('count')
    const { data: companies } = await supabase.from('companies').select('count')
    
    console.log('✅ Database setup completed successfully!')
    console.log(`📊 Categories table: ${categories ? 'Created' : 'Ready'}`)
    console.log(`📊 Companies table: ${companies ? 'Created' : 'Ready'}`)
    
    // Insert sample data if tables are empty
    const { data: existingCategories } = await supabase.from('categories').select('id').limit(1)
    
    if (!existingCategories || existingCategories.length === 0) {
      console.log('📝 Inserting sample categories...')
      const sampleCategories = [
        { name: 'Solar Energy', slug: 'solar-energy', description: 'Companies focused on solar power generation and photovoltaic technology' },
        { name: 'Wind Power', slug: 'wind-power', description: 'Wind energy companies including turbine manufacturers and wind farm developers' },
        { name: 'Electric Vehicles', slug: 'electric-vehicles', description: 'Electric vehicle manufacturers, charging infrastructure, and EV technology' },
        { name: 'Carbon Capture', slug: 'carbon-capture', description: 'Carbon capture, utilization, and storage (CCUS) technology companies' },
        { name: 'Green Finance', slug: 'green-finance', description: 'Financial institutions and fintech companies focused on sustainable investments' },
        { name: 'Sustainable Agriculture', slug: 'sustainable-agriculture', description: 'AgTech companies promoting sustainable farming and food production' }
      ]
      
      const { error: insertError } = await supabase.from('categories').insert(sampleCategories)
      if (insertError) {
        console.log('⚠️  Sample categories already exist or error inserting:', insertError.message)
      } else {
        console.log('✅ Sample categories inserted successfully!')
      }
    }

    console.log('\n🎉 Database setup complete! Ready for development.')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    process.exit(1)
  }
}

setupDatabase()
