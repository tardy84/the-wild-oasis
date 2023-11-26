import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vzybwhrnpbwreltiekgf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eWJ3aHJucGJ3cmVsdGlla2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NDQwNzcsImV4cCI6MjAxNDMyMDA3N30.EMEVMhADztj52nvD8iBVhMQdbhZ6fM6A5kLUfn8TRSc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
