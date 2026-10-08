# Admin setup

The site uses the Supabase project configured in `.env.local`.

1. Open the Supabase dashboard and run `supabase/schema.sql` in the SQL Editor.
2. In **Authentication → Users**, create the email/password user who should access the admin panel.
3. Copy that user's UUID, then run this in the SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('PASTE_USER_UUID_HERE');
```

4. Open `/admin` on the site and sign in with that user's email and password.

Only IDs present in `admin_users` can read or update enquiries. Public visitors can only create a new enquiry.
