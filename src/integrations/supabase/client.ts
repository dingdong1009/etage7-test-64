// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kspvhtrfptqbupabdsev.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzcHZodHJmcHRxYnVwYWJkc2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODY3MzIsImV4cCI6MjA1OTM2MjczMn0.Ao5Ct05N8ho_rmwdyRAvST2nS-mXLCDKSpgjjRWJvQM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);