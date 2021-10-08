import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://cbpffwulmjosinyaygbs.supabase.co',
  process.env.SUPABASE_ANON_KEY
);
