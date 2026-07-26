import { useState } from "react"
import { login } from "../auth/connection"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await login()
    } catch (error) {
      console.error("Error signing in:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute flex flex-col min-w-full min-h-full items-center text-center justify-center px-4 bg-bg">
      <p className="text-xl text-fg font-extrabold ">f o r m s e c u r e</p>
      <div>
        <p className="text-sm text-text justify-center items-center mt-2 mb-10">
          a secure form creation site developed by matthew pun :)
        </p>
        <button onClick={handleGoogleSignIn} className="p-5 font-bold text-text bg-fg rounded-xl" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  )
}
