import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const PROJECT_URL = "https://srcfbrparudyyyoadtvt.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyY2ZicnBhcnVkeXl5b2FkdHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzA0MjQsImV4cCI6MTk4Mzc0NjQyNH0.dGdz-XMHgT9AIBa_GF51hNawXuCrM4FuTApCQd4x-lI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}