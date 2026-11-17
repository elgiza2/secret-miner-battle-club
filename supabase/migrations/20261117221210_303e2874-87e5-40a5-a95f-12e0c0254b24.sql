CREATE OR REPLACE FUNCTION public.zro_invite_reward(_tg bigint, _amount numeric)
RETURNS numeric LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.zro_users SET zro = zro + _amount WHERE tg_id = _tg RETURNING zro;
$$;
REVOKE ALL ON FUNCTION public.zro_invite_reward(bigint, numeric) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.zro_invite_reward(bigint, numeric) TO service_role;