import {createClient} from '@supabase/supabase-js'
const supabaseUrl = '<yourSupabaseUrl>';
const supabaseKey = '<yourSupabaseKey>';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;