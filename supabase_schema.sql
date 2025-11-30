create type app_status as enum ('successful', 'in-progress', 'failed');
create type app_type as enum ('web', 'ios');

create table public.apps (
  id uuid not null default gen_random_uuid (),
  name text not null,
  description text not null,
  status app_status not null,
  type app_type not null,
  url text null,
  app_store_url text null,
  image_url text null,
  created_at timestamp with time zone not null default now(),
  constraint apps_pkey primary key (id)
);

-- Insert sample data
insert into public.apps (name, description, status, type, url)
values
  ('My First Web App', 'A cool web app I built.', 'successful', 'web', 'https://example.com'),
  ('Project X', 'Currently working on this.', 'in-progress', 'web', null),
  ('Failed Experiment', 'Learned a lot from this one.', 'failed', 'web', null);
