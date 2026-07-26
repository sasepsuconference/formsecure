import { useEffect, useState } from 'react'
import Login from './components/Login.tsx'
import MenuBar from './components/MenuBar.tsx'
import Dashboard from './components/Dashboard.tsx'
import './index.css'
import { getCurrentUser } from './services/user.tsx';

function App() {
  const [dark, setDark] = useState(false)
  const [signedIn, setSignIn] = useState(false)
  // Declare the inner async function
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          setSignIn(false);
        }
        else {
          setSignIn(true);
        }
      } catch (error) {
        setSignIn(false);
      }
    };
    loadUser(); // Execute immediately
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text transition-colors duration-200">
      <MenuBar dark={dark} onToggleDark={() => setDark((prev) => !prev)} setSignedIn={setSignIn} />
      {signedIn ? <Dashboard/> : <Login setSignedIn={setSignIn} />
      }
    </div>
  )
}

export default App
