// Our database connector
import { createClient } from '@supabase/supabase-js';
import env from 'dotenv';

env.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);

export default supabase;
