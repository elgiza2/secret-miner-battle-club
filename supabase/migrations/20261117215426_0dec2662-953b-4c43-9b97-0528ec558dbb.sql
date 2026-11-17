alter table public.zro_users add column if not exists last_ad_at timestamptz;
create index if not exists zro_task_claims_task_idx on public.zro_task_claims(task_id);
create index if not exists zro_withdrawals_tg_idx on public.zro_withdrawals(tg_id);
create table public.zro_season_claims (
  tg_id bigint not null references public.zro_users(tg_id) on delete cascade,
  tier integer not null,
  track text not null,
  created_at timestamptz not null default now(),
  primary key (tg_id, tier, track)
);
grant all on public.zro_season_claims to service_role;
alter table public.zro_season_claims enable row level security;