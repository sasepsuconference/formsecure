import { createForm } from "../services/form.tsx"
import { getCurrentUserId } from "../services/user.tsx"

export default function FormEditor() {
    return (
        <div>
            <button onClick={() => {}}>
                create the form
            </button>
        </div>
    )
}

// old conference form, TODO: actual form ui here
const makeForm = async () => { 
    const owner_id = await getCurrentUserId();

    // If the owner isnt logged in
    if (!owner_id) return;

    await createForm({
        name: "Conference Registration",
        description: "Registration form for the conference",
        questions: [
        {
            id: "q1",
            question: "First Name",
            type: "text",
            required: true,
        },
        {
            id: "q2",
            question: "Last Name",
            type: "text",
            required: true,
        },
        {
            id: "q3",
            question: "Middle Name",
            type: "text",
            required: false,
        },
        {
            id: "q4",
            question: "DOB",
            type: "text",
            required: true,
        },
        {
            id: "q5",
            question: "Gender",
            type: "multiple_choice",
            options: ["Male", "Female", "Non-Binary", "Other"],
            required: true,
        },
        {
            id: "q6",
            question: "Passport Number",
            type: "text",
            required: true,
        },
        {
            id: "q7",
            question: "Nationality",
            type: "text",
            required: true,
        },
        {
            id: "q8",
            question: "Passport Expiration Date",
            type: "text",
            required: true,
        },
        {
            id: "q9",
            question: "Country Issue",
            type: "text",
            required: true,
        },
        {
            id: "q10",
            question: "Phone",
            type: "text",
            required: true,
        },
        {
            id: "q11",
            question: "Email Address",
            type: "text",
            required: true,
        },
        ],
        owner_id: owner_id,
    })
};