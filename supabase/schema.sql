-- FAIRA enquiries table — run in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  business_type text not null default 'Other',
  service_needed text[] not null default '{}',
  budget_range text not null default '',
  timeline text not null default '',
  contact_name text not null default '',
  phone text not null default '',
  email text not null default '',
  city text not null default '',
  message text not null default '',
  status text not null default 'New'
    check (status in ('New','Contacted','In Progress','Converted','Closed')),
  internal_notes text not null default '',
  source text not null default 'website'
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row Level Security: anyone may submit; only signed-in admin may read/update.
alter table public.enquiries enable row level security;

create policy "public can insert enquiries"
  on public.enquiries for insert
  with check (true);

create policy "authenticated can read enquiries"
  on public.enquiries for select
  to authenticated
  using (true);

create policy "authenticated can update enquiries"
  on public.enquiries for update
  to authenticated
  using (true)
  with check (true);
