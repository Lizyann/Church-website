import { createClient } from '@supabase/supabase-js';

// Credentials provided by the user. 
// In a standard Vite setup, we would use import.meta.env.VITE_SUPABASE_URL
const supabaseUrl = 'https://geagxvebjcrvonpspwba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYWd4dmViamNydm9ucHNwd2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjU1NjQsImV4cCI6MjA4MTE0MTU2NH0.zBSm99zAQcMIs5MQthh1F6Z1wqKI9LLetwX_JvXbEH0';

export const supabase = createClient(supabaseUrl, supabaseKey);