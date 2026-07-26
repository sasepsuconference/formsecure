import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:
        "https://sasepsuconference.github.io/formsecure/",

    },
  })
}

export async function logout() {
  await supabase.auth.signOut()
}

export async function getAccessToken() {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token
}

// Use this to get any data needed
export async function fetchUserData() {
  const token = await getAccessToken()

  const res = await fetch('http://localhost:5000/api/index', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await res.json()
}