import { Menu, Bell } from 'lucide-react';
import { useStore} from '../store/useStore';

const Navbar = () => {
    const { role, setRole, toggleSidebar } = useStore();
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
            <Menu size={20} />
        </button>

        <div className="flex items-center gap-6">
            <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setRole('admin')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${role === 'admin' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            >
                Admin
            </button>
            <button 
                onClick={()=> setRole('viewer')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${role=== 'viewer' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
            >
                Viewer
            </button>
            </div>

            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 text-slate-600">
            <Bell size={20}/>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                MS
            </div>
            </div>
        </div>
        </header>
    )
}

export default Navbar;