import { supabase } from "../auth/connection.tsx";
import type { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }
  return user;
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const currentUser = await getCurrentUser();
    return currentUser?.id ?? null;
  } catch (e) {
    console.log(e)
  }

  return null;
}