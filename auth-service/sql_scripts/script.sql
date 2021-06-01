insert into favorites(account_id, slug)
select id as account_id,
  'lol' as slug
from account
where email = 'test@test.com';
select slug
from favorites
where account_id in (
    select id as account_id
    from account
    where email = 'test@test.com'
  );
delete from favorites
where slug = 'lol'
  and account_id in (
    select id as account_id
    from account
    where email = 'test@test.com'
  );