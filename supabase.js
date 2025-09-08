// Importando o Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 Coloque aqui as credenciais do seu projeto Supabase
const SUPABASE_URL = "https://fvrbxhvveogjsunnoryu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cmJ4aHZ2ZW9nanN1bm5vcnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDA4MjIsImV4cCI6MjA3MDU3NjgyMn0.oKca_CWbxV0eQMseGuv-ZUGTm-F-Ya-0nXM3n-VAk2A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
