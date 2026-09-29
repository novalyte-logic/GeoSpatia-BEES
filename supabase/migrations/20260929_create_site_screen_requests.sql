-- Migration: Create site_screen_requests table with Row Level Security (RLS)
-- Purpose: Safely capture California BESS preliminary site screen inquiries from the public marketing form.
-- Security: RLS is enabled. Public anon users can only INSERT valid inquiry rows.
--           Public users CANNOT SELECT, UPDATE, or DELETE any inquiry rows.

create table if not exists public.site_screen_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) >= 2 and char_length(full_name) <= 160),
  work_email text not null check (char_length(trim(work_email)) >= 5 and char_length(work_email) <= 200 and work_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  company text not null check (char_length(trim(company)) >= 2 and char_length(company) <= 200),
  role text not null check (char_length(trim(role)) >= 2 and char_length(role) <= 160),
  candidate_site text not null check (char_length(trim(candidate_site)) >= 5 and char_length(candidate_site) <= 1000),
  project_type text not null check (char_length(project_type) <= 100),
  approximate_capacity_mw text check (approximate_capacity_mw is null or char_length(approximate_capacity_mw) <= 60),
  approximate_duration_hours text check (approximate_duration_hours is null or char_length(approximate_duration_hours) <= 60),
  development_stage text not null check (char_length(development_stage) <= 100),
  primary_decision_question text not null check (char_length(trim(primary_decision_question)) >= 10 and char_length(primary_decision_question) <= 3000),
  additional_notes text check (additional_notes is null or char_length(additional_notes) <= 4000),
  status text not null default 'new' check (status in ('new', 'in_review', 'scope_confirmed', 'declined', 'archived'))
);

-- Enable Row Level Security (mandatory)
alter table public.site_screen_requests enable row level security;

-- Drop any existing policies to avoid conflicts on re-run
drop policy if exists "Allow public anonymous insert only" on public.site_screen_requests;
drop policy if exists "Deny all public reads" on public.site_screen_requests;
drop policy if exists "Deny all public updates" on public.site_screen_requests;
drop policy if exists "Deny all public deletes" on public.site_screen_requests;

-- Policy: Allow public/anon to INSERT inquiries
create policy "Allow public anonymous insert only"
  on public.site_screen_requests
  for insert
  to anon, authenticated
  with check (true);

-- Explicitly ensure NO SELECT permission for anon (only service_role or authenticated dashboard users can read leads)
-- Supabase default with RLS enabled blocks SELECT unless permitted by a policy.

-- Index for ordering in the Supabase dashboard
create index if not exists idx_site_screen_requests_created_at
  on public.site_screen_requests (created_at desc);

create index if not exists idx_site_screen_requests_status
  on public.site_screen_requests (status);

comment on table public.site_screen_requests is 'Inquiry submissions from Geospatial Labs marketing site screen form.';
