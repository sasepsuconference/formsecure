import { useEffect, useState } from "react";
import type { Form } from "../services/form";
import {
  getFormResponses,
  type Response,
} from "../services/response";

type ResponsePageProps = {
  form: Form;
  setForm: (form: Form | null) => void;
};

export default function ResponsePage({
  form,
  setForm,
}: ResponsePageProps) {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResponses() {
      try {
        setLoading(true);

        const data = await getFormResponses(form.id);

        setResponses(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    }

    loadResponses();
  }, [form.id]);

  if (loading) {
    return <p>Loading responses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full px-4 py-6">
      <button
        onClick={() => setForm(null)}
        className="mb-6 rounded-lg bg-card px-4 py-2"
      >
        ← Back
      </button>

      <h1 className="mb-2 text-center text-2xl font-bold">
        {form.name}
      </h1>

      <p className="mb-8 text-center">
        {responses.length} response
        {responses.length !== 1 ? "s" : ""}
      </p>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {responses.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center">
            No responses yet.
          </div>
        ) : (
          responses.map((response, index) => (
            <div
              key={response.id}
              className="rounded-xl bg-card p-6 shadow"
            >
              <div className="mb-6 flex justify-between border-b pb-4">
                <h2 className="text-lg font-bold">
                  Response {responses.length - index}
                </h2>

                <p className="text-sm">
                  {new Date(
                    response.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {form.questions.map((question) => {
                  const answer =
                    response.response[question.id];

                  return (
                    <div key={question.id}>
                      <p className="font-semibold">
                        {question.question}
                      </p>

                      <p className="mt-1">
                        {Array.isArray(answer)
                          ? answer.join(", ")
                          : answer ?? "No answer"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}