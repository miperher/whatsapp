import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvpyhwptmgkxupjsmimi.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2cHlod3B0bWdreHVwanNtaW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMTU1MjcsImV4cCI6MjA0Njg5MTUyN30.DtD5MLBrexHzKP3-Ew2Gg6Nz9KarYjBimxPosmLEyC0'

export const supabase = createClient(supabaseUrl, supabaseKey)
