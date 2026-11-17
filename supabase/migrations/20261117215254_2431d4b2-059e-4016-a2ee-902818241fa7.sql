create table public.zro_users (
  tg_id bigint primary key,
  username text, first_name text, photo_url text,
  ref_by bigint,
  zro numeric not null default 0,
  gram numeric not null default 0,
  energy integer not null default 25,
  regen_from timestamptz not null default now(),
  position integer not null default 0,
  xp integer not null default 0,
  spins integer not null default 1,
  verified boolean not null default false,
  premium boolean not null default false,
  wallet_address text,
  last_daily date,
  last_share date,
  ads_watched integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant all on public.zro_users to service_role;
alter table public.zro_users enable row level security;

create table public.zro_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  chat_id text,
  reward_energy integer not null default 10,
  sort integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant all on public.zro_tasks to service_role;
alter table public.zro_tasks enable row level security;

create table public.zro_task_claims (
  tg_id bigint not null references public.zro_users(tg_id) on delete cascade,
  task_id uuid not null references public.zro_tasks(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (tg_id, task_id)
);
grant all on public.zro_task_claims to service_role;
alter table public.zro_task_claims enable row level security;

create table public.zro_withdrawals (
  id uuid primary key default gen_random_uuid(),
  tg_id bigint not null references public.zro_users(tg_id) on delete cascade,
  coin text not null,
  amount numeric not null,
  address text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
grant all on public.zro_withdrawals to service_role;
alter table public.zro_withdrawals enable row level security;

create table public.zro_draw_entries (
  id uuid primary key default gen_random_uuid(),
  tg_id bigint not null references public.zro_users(tg_id) on delete cascade,
  draw_day date not null default current_date,
  created_at timestamptz not null default now(),
  unique (tg_id, draw_day)
);
grant all on public.zro_draw_entries to service_role;
alter table public.zro_draw_entries enable row level security;

create or replace function public.zro_touch() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger zro_users_touch before update on public.zro_users for each row execute function public.zro_touch();

insert into public.zro_tasks (title, url, chat_id, reward_energy, sort) values
 ('انضم لمجتمع ميكاسا', 'https://t.me/oraien', '@oraien', 10, 1),
 ('انضم لتطبيق ميكاسا', 'https://t.me/Mixsaabot?startapp', null, 10, 2);