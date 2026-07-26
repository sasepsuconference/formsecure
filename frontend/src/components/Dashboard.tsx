import { useState, useEffect } from "react"
import { getMyForms } from "../services/form";
import type { Form } from "../services/form"
import FormPage from "./Form.tsx"
import { getCurrentUserId } from "../services/user.tsx";
import ResponsePage from "./ResponsePage.tsx" 
export default function Dashboard() {
	const [forms, setForms] = useState<Form[]>();
	const [currentForm, setCurrentForm] = useState<Form | null>();
	const [response, setResponse] = useState(false);
	const [currentUser, setCurrentUser] = useState<string| null>();
	useEffect(() => {
		async function getForms() {
			const formlist = await getMyForms();
			if (formlist) {
				setForms(formlist);
			}
		}
		async function getUser() {
			const user = await getCurrentUserId();
			setCurrentUser(user);
		}
		getForms();
		getUser();
	}, [])
	return (
			<div>
				{!currentForm ? 
					<div>
						{forms?.map((form) => (
  						<div
								key={form.id}
								className="flex flex-row justify-between rounded-md mx-20 my-10 x-auto p-5"
							>
								<button 					
								className="bg-card text-text w-full hover:scale-[1.02] active:scale-[.98] transition p-2"			
								onClick={() => {
									setCurrentForm(form);
									setResponse(false);
								}}>{form.name}</button>
								{form.owner_id == currentUser && 
									<button
										className="bg-fg text-text w-full hover:scale-[1.02] active:scale-[.98] transition p-2"
										onClick={() => {
											setResponse(true);
											setCurrentForm(form);
										}}
									>
										see responses
									</button>
									}
							</div>
						))}
					</div>
				: currentForm && !response ? <FormPage form={currentForm} setForm={setCurrentForm}/> 
																	: <ResponsePage form={currentForm} setForm={setCurrentForm}/>
				}
				
			</div>
		
	);
}