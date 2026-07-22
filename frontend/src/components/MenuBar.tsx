
import { 
    User,
    Settings 

} from 'lucide-react'

export default function MenuBar() {
    const login = () => {
        // LOGIN LOGIC HERE
    }

    return (
    <div className="flex w-full h-[75px] flex-row justify-between items-center gap-4 bg-card p-4 text-fg shadow-sm pl-10 pr-10">
        <p className="text-xl font-extrabold">f o r m s e c u r e</p>
        <div className = "flex flex-row justify-between items-center gap-5">
            <Settings className="h-6 w-6 hover:scale-105 active:scale-95" onClick = {login}/>
            <User className="h-6 w-6 hover:scale-105 active:scale-95" onClick = {login}/>
        </div>
    </div>
  )
}
