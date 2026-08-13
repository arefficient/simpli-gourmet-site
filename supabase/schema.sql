-- ============================================================
-- Simpli Gourmet — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor).
-- ============================================================

-- 1. PROFILES — one row per auth user (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 2. QUOTE REQUESTS — form submissions from Contact page
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  event_type text,
  event_date date,
  guests integer,
  package text check (package in ('repass', 'hibachi', 'corporate', 'custom')),
  message text,
  status text not null default 'pending' check (status in ('pending', 'responded', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

-- Guests and logged-in users can submit
create policy "quote_requests_insert" on public.quote_requests
  for insert with check (true);

-- Users can read their own submissions
create policy "quote_requests_select_own" on public.quote_requests
  for select using (auth.uid() = user_id);

-- 3. PAGE VIEWS — logged by middleware on every navigation
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  user_agent text,
  viewed_at timestamptz not null default now()
);

alter table public.page_views enable row level security;

-- Indexes for the admin dashboard queries
create index if not exists page_views_viewed_at_idx on public.page_views (viewed_at);
create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists quote_requests_user_id_idx on public.quote_requests (user_id);
create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at);

-- Server (middleware / route handlers) inserts via service role
create policy "page_views_insert_service" on public.page_views
  for insert with check (true);

-- 4. ADMIN helper function + view
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Admins can read all quotes
create policy "quote_requests_admin_select" on public.quote_requests
  for select using (public.is_admin());

-- Admins can update quote status
create policy "quote_requests_admin_update" on public.quote_requests
  for update using (public.is_admin());

-- Admins can read profiles
create policy "profiles_admin_select" on public.profiles
  for select using (public.is_admin());

-- Admins can read page views
create policy "page_views_admin_select" on public.page_views
  for select using (public.is_admin());

-- 5. Make the first user an admin (replace with your account email)
-- update public.profiles set role = 'admin'
-- where email = 'your@email.com'; -- profiles has no email column;
-- join auth.users instead:
-- update public.profiles set role = 'admin'
-- from auth.users
-- where auth.users.id = public.profiles.id
--   and auth.users.email = 'your@email.com';
