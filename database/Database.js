import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://yxyqkeclvwyyqjodcqnc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eXFrZWNsdnd5eXFqb2RjcW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4ODE3MDMsImV4cCI6MjA0MDQ1NzcwM30.zDe6lbFeH3RsmamBsa1mxcuy_L_swWdKNDLJcOTv7zk';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;