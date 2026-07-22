
import {
  User,
  Settings,
  Moon,
  Sun,
} from 'lucide-react'

import '../index.css'
type MenuBarProps = {
  dark: boolean
  onToggleDark: () => void
}

export default function MenuBar({ dark, onToggleDark }: MenuBarProps) {
  const login = () => {
    // LOGIN LOGIC HERE
  }

  return (
    <div className="flex w-full h-[75px] flex-row justify-between items-center gap-4 bg-card p-4 text-fg shadow-sm pl-10 pr-10 transition-colors duration-200">
      <p className="text-xl font-extrabold">f o r m s e c u r e</p>
      <div className="flex flex-row justify-between items-center gap-5">
        {dark ? (
          <Sun
            className="h-6 w-6 hover:scale-105 active:scale-95"
            onClick={onToggleDark}
          />
        ) : (
          <Moon
            className="h-6 w-6 hover:scale-105 active:scale-95"
            onClick={onToggleDark}
          />
        )}
        <Settings
          className="h-6 w-6 hover:scale-105 active:scale-95"
          onClick={login}
        />
        <User
          className="h-6 w-6 hover:scale-105 active:scale-95"
          onClick={login}
        />
      </div>
    </div>
  )
}
