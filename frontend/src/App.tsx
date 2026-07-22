import { useEffect, useState } from 'react'
import MenuBar from './components/MenuBar.tsx'
import './index.css'

function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-bg">
      <MenuBar></MenuBar>

    </div>
  )
}

export default App
