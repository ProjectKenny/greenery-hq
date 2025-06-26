# GreeneryHQ 🌱

A comprehensive directory of green technology companies driving climate solutions, renewable energy, and sustainable innovation worldwide.

## Features

- **Company Directory**: Browse and search green tech companies by category, location, and technology
- **Category Filtering**: Explore companies across 12+ green technology sectors
- **User Authentication**: Secure user registration and login with Supabase Auth
- **Company Submissions**: Users can submit new companies for review
- **Admin Dashboard**: Moderation tools for approving/rejecting submissions
- **Responsive Design**: Mobile-first, clean and modern interface
- **SEO Optimized**: Built for search engine discoverability

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, APIs)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Analytics**: Supabase Analytics

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd greenery-hq
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL to create tables, policies, and sample data

### 4. Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create the following buckets:
   - `company-logos` (public)
   - `illustrations` (public)
   - `documents` (public)
   - `avatars` (public)
   - `placeholders` (public)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
greenery-hq/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Homepage
│   ├── lib/
│   │   └── supabase.ts      # Supabase client and types
│   └── components/          # Reusable React components (to be added)
├── public/                  # Static assets
├── supabase-schema.sql      # Database schema and setup
└── .env.local              # Environment variables
```

## Database Schema

### Core Tables

- **categories**: Green tech industry categories (Solar, Wind, EV, etc.)
- **companies**: Company directory with details and status
- **profiles**: User profiles extending Supabase auth
- **ratings**: User ratings and reviews for companies

### Key Features

- **Row Level Security (RLS)**: Secure data access policies
- **Full-text Search**: PostgreSQL search across company names and descriptions
- **Admin Moderation**: Approval workflow for company submissions
- **User Roles**: User and admin role management

## Development Roadmap

### Phase 1: Core Directory (Current)
- [x] Project setup and basic UI
- [x] Supabase integration and schema
- [ ] Company listing and search
- [ ] Category filtering
- [ ] User authentication

### Phase 2: User Features
- [ ] Company submission form
- [ ] User profiles and dashboards
- [ ] Rating and review system
- [ ] Advanced search and filters

### Phase 3: Admin Features
- [ ] Admin dashboard
- [ ] Company moderation
- [ ] Analytics and reporting
- [ ] Bulk import tools

### Phase 4: Enhancement
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Mobile app considerations
- [ ] API documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.
