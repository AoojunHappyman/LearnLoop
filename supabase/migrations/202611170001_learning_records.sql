begin;
create table public.learning_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,
  value text not null,
  primary key (user_id, key)
);
alter table public.learning_records enable row level security;
revoke all on public.learning_records from public, anon, authenticated;
grant select, insert, update on public.learning_records to authenticated;
create policy own_records on public.learning_records for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
commit;
