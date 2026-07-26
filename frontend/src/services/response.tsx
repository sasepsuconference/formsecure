import { supabase } from "../auth/connection.tsx";
import { getCurrentUserId } from "./user.tsx";

export type Answer = string | string[] | number;

export type Answers = Record<string, Answer>;

export type Response = {
  id: number;
  form_id: number;
  responder_id: string;
  response: Answers;
  created_at: string;
};

export async function getFormResponses(
  formId: number
): Promise<Response[]> {
  const { data, error } = await supabase
    .from("RESPONSES")
    .select("*")
    .eq("form_id", formId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function submitResponse(
  formId: number,
  response: Answers
) {
	const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await supabase
  .from("RESPONSES")
  .upsert(
    {
      form_id: formId,
      response,
      responder_id: userId,
    },
    {
      onConflict: "form_id,responder_id",
    }
  )
  .select()
  .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getResponse(
  formId: number
): Promise<Answers | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("RESPONSES")
    .select("response")
    .eq("form_id", formId)
    .eq("responder_id", userId)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data?.response ?? null;
}