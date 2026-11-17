CREATE TABLE public.zro_payments (
  memo text PRIMARY KEY,
  tg_id bigint NOT NULL,
  kind text NOT NULL,
  ref text,
  amount numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.zro_payments TO service_role;
ALTER TABLE public.zro_payments ENABLE ROW LEVEL SECURITY;
CREATE INDEX zro_payments_tg_idx ON public.zro_payments(tg_id);

CREATE OR REPLACE FUNCTION public.zro_invite_reward(_tg bigint, _amount numeric)
RETURNS numeric LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.zro_users SET zro = zro + _amount, energy = energy + 10 WHERE tg_id = _tg RETURNING zro;
$$;
REVOKE ALL ON FUNCTION public.zro_invite_reward(bigint, numeric) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.zro_invite_reward(bigint, numeric) TO service_role;