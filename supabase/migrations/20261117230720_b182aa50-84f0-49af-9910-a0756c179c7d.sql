CREATE TABLE public.zro_admins (
  tg_id bigint PRIMARY KEY,
  username text,
  role text NOT NULL DEFAULT 'tasks',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.zro_admins TO service_role;
ALTER TABLE public.zro_admins ENABLE ROW LEVEL SECURITY;