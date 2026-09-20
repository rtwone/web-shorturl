# Shortly

A modern shortlink application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- Create short links using the root domain format like `https://domain.com/github`
- Custom slug validation and automatic slug generation
- Redirect tracking with atomic click increment using PostgreSQL RPC
- Link management dashboard and search
- Thumbnail upload support via Supabase Storage
- Dark mode and responsive UI
- Open Graph metadata ready for public links

## Requirements

- Node.js 18+
- A Supabase project

## Environment setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase setup

1. Create a new Supabase project.
2. Run the SQL from `supabase/schema.sql`.
3. Create a `thumbnails` storage bucket.
4. Set bucket public access if you want direct image access.
5. Make sure RLS is enabled and policies are created.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
```
"# web-shorturl" 
