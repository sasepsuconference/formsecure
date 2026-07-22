import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-bg">


    </div>
  )
}

export default App
