create extension if not exists pgcrypto;

create table if not exists public.shortlinks (
  id uuid primary key default gen_random_uuid(),
  slug varchar(100) not null unique,
  original_url text not null,
  title varchar(255),
  description text,
  thumbnail_url text,
  clicks bigint default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_shortlinks_slug on public.shortlinks(slug);
create index if not exists idx_shortlinks_created_at on public.shortlinks(created_at desc);

create or replace function public.increment_shortlink_clicks(p_slug text)
returns public.shortlinks
language sql
as $$
  update public.shortlinks
  set clicks = clicks + 1,
      updated_at = now()
  where slug = p_slug and is_active = true
  returning *;
$$;

alter table public.shortlinks enable row level security;

create policy "Public can read active shortlinks"
  on public.shortlinks for select
  using (is_active = true);

create policy "Anyone can insert shortlinks"
  on public.shortlinks for insert
  with check (true);

create policy "Anyone can update shortlinks"
  on public.shortlinks for update
  using (true)
  with check (true);

create policy "Anyone can delete shortlinks"
  on public.shortlinks for delete
  using (true);

create policy "Allow public uploads to thumbnails bucket"
  on storage.objects for insert
  with check (bucket_id = 'thumbnails');

create policy "Allow public read of thumbnails bucket"
  on storage.objects for select
  using (bucket_id = 'thumbnails');

create policy "Allow public delete of thumbnails bucket"
  on storage.objects for delete
  using (bucket_id = 'thumbnails');
