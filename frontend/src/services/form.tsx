// attendeeService.ts

import { supabase } from '../auth/connection';

export type Question = {
  id: string;
  question: string;
  type: "text" | "multiple_choice" | "checkbox" | "rating";
  options?: string[];
  required?: boolean;
};

export type Form = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  questions: Question[];
  owner_id: string;
};

export type CreateFormInput = {
  name: string;
  description?: string;
  questions: Question[];
  owner_id: string;
};

export type UpdateFormInput = {
  name?: string;
  description?: string;
  questions?: Question[];
};

export async function createForm(
  form: CreateFormInput
): Promise<Form> {
  const { data, error } = await supabase
    .from("FORMS")
    .insert({
      name: form.name,
      description: form.description ?? null,
      questions: form.questions,
      owner_id: form.owner_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getForm(
  formId: number
): Promise<Form> {
  const { data, error } = await supabase
    .from("FORMS")
    .select("*")
    .eq("id", formId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateForm(
  formId: number,
  updates: UpdateFormInput
): Promise<Form> {
  const { data, error } = await supabase
    .from("FORMS")
    .update(updates)
    .eq("id", formId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteForm(
  formId: number
): Promise<void> {
  const { error } = await supabase
    .from("FORMS")
    .delete()
    .eq("id", formId);

  if (error) {
    throw error;
  }
}


export async function getMyForms(): Promise<Form[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await supabase
    .from("FORMS")
    .select("*")
//    .eq("owner_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}