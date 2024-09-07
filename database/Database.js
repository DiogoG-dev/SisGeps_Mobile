import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://lrxznfpnkcikjdiufdkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeHpuZnBua2Npa2pkaXVmZGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2NTE0MzcsImV4cCI6MjA0MTIyNzQzN30.Ep3qI5muI-3txG1YuYkMlIU7fT_CsYUhDj9OgSJPYYo';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;