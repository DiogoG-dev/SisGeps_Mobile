import {createClient} from '@supabase/supabase-js';
import {supabaseUrl, supabaseKey} from '@env';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;