-- Job Tracker cloud sync — one-time setup
-- Run this in Supabase: SQL Editor → New query → paste → Run

create table if not exists public.tracker_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.tracker_data enable row level security;

create policy "Users read own data"
  on public.tracker_data for select
  using (auth.uid() = user_id);

create policy "Users insert own data"
  on public.tracker_data for insert
  with check (auth.uid() = user_id);

create policy "Users update own data"
  on public.tracker_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users delete own data"
  on public.tracker_data for delete
  using (auth.uid() = user_id);
