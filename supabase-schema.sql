-- GreeneryHQ Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    website VARCHAR(500),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    headquarters_city VARCHAR(100),
    headquarters_country VARCHAR(100),
    founded_year INTEGER CHECK (founded_year > 1800 AND founded_year <= EXTRACT(YEAR FROM NOW())),
    employee_count VARCHAR(50), -- e.g., "1-10", "11-50", "51-200", "201-500", "500+"
    logo_url TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ratings table
CREATE TABLE ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, user_id) -- One rating per user per company
);

-- Create indexes for better performance
CREATE INDEX idx_companies_category ON companies(category_id);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_country ON companies(headquarters_country);
CREATE INDEX idx_companies_name_search ON companies USING gin(to_tsvector('english', name));
CREATE INDEX idx_companies_description_search ON companies USING gin(to_tsvector('english', description));
CREATE INDEX idx_ratings_company ON ratings(company_id);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Solar Energy', 'solar-energy', 'Companies focused on solar power generation and photovoltaic technology'),
('Wind Power', 'wind-power', 'Wind energy companies including turbine manufacturers and wind farm developers'),
('Electric Vehicles', 'electric-vehicles', 'Electric vehicle manufacturers, charging infrastructure, and EV technology'),
('Carbon Capture', 'carbon-capture', 'Carbon capture, utilization, and storage (CCUS) technology companies'),
('Green Finance', 'green-finance', 'Financial institutions and fintech companies focused on sustainable investments'),
('Sustainable Agriculture', 'sustainable-agriculture', 'AgTech companies promoting sustainable farming and food production'),
('Energy Storage', 'energy-storage', 'Battery technology and energy storage solution providers'),
('Green Building', 'green-building', 'Sustainable construction materials and green building technology'),
('Water Technology', 'water-technology', 'Water purification, conservation, and management technology companies'),
('Waste Management', 'waste-management', 'Recycling, waste-to-energy, and circular economy companies'),
('Clean Transportation', 'clean-transportation', 'Public transport, logistics, and mobility solutions for sustainability'),
('Environmental Monitoring', 'environmental-monitoring', 'Companies providing environmental data, monitoring, and analytics');

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Categories: Only admins can modify
CREATE POLICY "Only admins can modify categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Companies: Public read for approved companies
CREATE POLICY "Approved companies are viewable by everyone" ON companies
    FOR SELECT USING (status = 'approved');

-- Companies: Users can view their own submissions
CREATE POLICY "Users can view their own company submissions" ON companies
    FOR SELECT USING (submitted_by = auth.uid());

-- Companies: Admins can view all companies
CREATE POLICY "Admins can view all companies" ON companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Companies: Authenticated users can insert
CREATE POLICY "Authenticated users can submit companies" ON companies
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Companies: Users can update their own submissions (if pending)
CREATE POLICY "Users can update their own pending submissions" ON companies
    FOR UPDATE USING (
        submitted_by = auth.uid() 
        AND status = 'pending'
    );

-- Companies: Admins can update any company
CREATE POLICY "Admins can update any company" ON companies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Profiles: Users can view all profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

-- Profiles: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
    FOR ALL USING (id = auth.uid());

-- Ratings: Public read access
CREATE POLICY "Ratings are viewable by everyone" ON ratings
    FOR SELECT USING (true);

-- Ratings: Authenticated users can insert their own ratings
CREATE POLICY "Users can insert their own ratings" ON ratings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ratings: Users can update their own ratings
CREATE POLICY "Users can update their own ratings" ON ratings
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function for full-text search
CREATE OR REPLACE FUNCTION search_companies(search_query TEXT)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    description TEXT,
    website VARCHAR,
    category_id UUID,
    headquarters_city VARCHAR,
    headquarters_country VARCHAR,
    founded_year INTEGER,
    employee_count VARCHAR,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        c.description,
        c.website,
        c.category_id,
        c.headquarters_city,
        c.headquarters_country,
        c.founded_year,
        c.employee_count,
        c.logo_url,
        c.created_at,
        ts_rank(
            to_tsvector('english', c.name || ' ' || COALESCE(c.description, '')),
            plainto_tsquery('english', search_query)
        ) as rank
    FROM companies c
    WHERE 
        c.status = 'approved'
        AND (
            to_tsvector('english', c.name || ' ' || COALESCE(c.description, '')) 
            @@ plainto_tsquery('english', search_query)
        )
    ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;
