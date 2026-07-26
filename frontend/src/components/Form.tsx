import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import type { Form } from '../services/form.tsx'
import { submitResponse, getResponse } from '../services/response.tsx'

type Answer = string | string[] | number;

type Answers = Record<string, Answer>;

type FormPageProps = {
  form: Form;
  setForm: (form: Form | null) => void;
};

export default function FormPage({ form, setForm }: FormPageProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [missingRequired, setMissingRequired] = useState<Set<string>>(
    new Set()
  );

  const [submitting, setSubmitting] = useState("idle");
  
  useEffect(() => {
    async function loadExistingResponse() {
      const existingAnswers = await getResponse(form.id);
      if (existingAnswers) {
        setAnswers(existingAnswers);
      }
    }
    loadExistingResponse();
  }, [form.id]); // load immediately

  const handleRadioChange = (
    questionId: string,
    option: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    setMissingRequired((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const handleCheckboxChange = (
    questionId: string,
    option: string
  ) => {
    setAnswers((prev) => {
      const currentAnswers = Array.isArray(prev[questionId])
        ? prev[questionId]
        : [];

      const isSelected = currentAnswers.includes(option);

      const updatedAnswers = isSelected
        ? currentAnswers.filter(
          (answer) => answer !== option
        )
        : [...currentAnswers, option];

      return {
        ...prev,
        [questionId]: updatedAnswers,
      };
    });

    setMissingRequired((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const handleTextChange = (
    questionId: string,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    setMissingRequired((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  function isAnswerEmpty(answer: Answer | undefined): boolean {
    if (answer === undefined || answer === null) {
      return true;
    }

    if (typeof answer === "string") {
      return answer.trim() === "";
    }

    if (Array.isArray(answer)) {
      return answer.length === 0;
    }

    return false;
  }

  async function submit() {
    const missingQuestions = new Set<string>();

    form.questions.forEach((question) => {
      if (
        question.required &&
        isAnswerEmpty(answers[question.id])
      ) {
        missingQuestions.add(question.id);
      }
    });

    if (missingQuestions.size > 0) {
      setMissingRequired(missingQuestions);

      const firstMissingQuestion = document.getElementById(
        `question-${Array.from(missingQuestions)[0]}`
      );

      firstMissingQuestion?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setMissingRequired(new Set());

    setSubmitting("submitting...");
    try {
      await submitResponse(form.id, answers);
      console.log("Response submitted successfully");
      setSubmitting("submitted!");
    } catch (error) {
      console.error("Failed to submit response:", error);
      setSubmitting("submission failed :(\nplease try again");
    }
  }

  return (
  <div className="flex flex-col w-full px-4">
    <div>
      <h1 className="text-center text-xl font-bold text-fg my-5">
        {form.name}
      </h1>

      <p className="text-center text-lg text-text my-5">
        {form.description}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {form.questions.map((question) => (
          <div
            key={question.id}
            id={`question-${question.id}`}
            className={
              (missingRequired.has(question.id)
                ? "border-accent"
                : "border-transparent") +
              " w-full max-w-3xl border-4 rounded-lg p-4 mx-auto my-5 bg-card"
            }
          >
            <p>
              {question.question}
              {question.required && "*"}
            </p>
            {(() => {
              switch (question.type) {
                case "multiple_choice":
                  return (
                    <div>
                      {question.options?.map((option) => (
                        <label
                          key={option}
                          style={{ display: "block" }}
                          className="my-1"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={
                              answers[question.id] === option
                            }
                            onChange={() =>
                              handleRadioChange(
                                question.id,
                                option
                              )
                            }
                            className="mx-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  );

                case "checkbox":
                  const selectedAnswers = answers[question.id];
                  return (
                    <div>
                      {question.options?.map((option) => (
                        <label
                          key={option}
                          style={{ display: "block" }}
                        >
                          <input
                            type="checkbox"
                            name={`question-${question.id}`}
                            value={option}
                            checked={
                              Array.isArray(selectedAnswers) &&
                              selectedAnswers.includes(option)
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                question.id,
                                option
                              )}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  );

                case "rating":
                  return (
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={
                        typeof answers[question.id] === "number"
                          ? answers[question.id]
                          : ""
                      }
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: Number(e.target.value),
                        }))
                      }
                    />
                  );

                default:
                  return (
                    <textarea
                      className="border border-fg p-1 rounded rounded-xl w-full h-8"
                      value={
                        typeof answers[question.id] === "string"
                          ? answers[question.id]
                          : ""
                      }
                      onChange={(e) =>
                        handleTextChange(
                          question.id,
                          e.target.value
                        )
                      }
                    />
                  );
              }
            })()}
          </div>
        ))}
        <button
          type="submit"
          className="block w-full max-w-3xl mx-auto px-2 py-2 my-5 bg-card hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit
        </button>
      </form>
    </div>
    {
      submitting != "idle" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="w-80 rounded-xl bg-card p-8 shadow-xl text-center">
            {submitting == "submitting" ?
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-fg/20 border-t-accent" />
              : <CheckCircle className="mx-auto mb-4 h-10 w-10 text-success"/>
            }

            <h2 className="text-xl font-semibold text-fg">
              {submitting}
            </h2>

            {submitting == "failed" &&
              <button 
                className="bg-fg rounded rounded-md"
                onClick={()=>{setSubmitting("idle")}}>try again</button>
            }
            {submitting == "submitted!" &&
              <button 
                className="my-3 p-5 bg-fg rounded rounded-md"
                onClick={()=>{
                  setSubmitting("idle"); 
                  setForm(null)
                }}
              >
                return home
              </button>
            }
          </div>
        </div>
      )
    }
  </div>
  );
}
