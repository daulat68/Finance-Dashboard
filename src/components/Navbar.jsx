import { Menu, Bell, Sun, Moon } from 'lucide-react';
import {useStore} from '../store/useStore';

const Navbar = () =>{
    const {role, setRole, toggleSidebar, theme, toggleTheme }=useStore();
    const isDark=theme=== 'dark';

    return (
        <header className="h-15 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
            <button 
                onClick={toggleSidebar} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-colors">
                <Menu size={20}/>
            </button>

            <div className="flex items-center gap-4 md:gap-6">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl transition-colors">
                    <button onClick={() => setRole('admin')}
                        className={`px-4 py-1 text-xs font-bold rounded-lg transition-all ${
                            role === 'admin' 
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}>
                        Admin
                    </button>
                    <button 
                        onClick={() => setRole('viewer')}
                        className={`px-4 py-1 text-xs font-bold rounded-lg transition-all ${
                            role === 'viewer' 
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}>
                        Viewer
                    </button>
                </div>

                <div className="flex items-center gap-3 border-l pl-4 md:pl-6 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <button className="relative hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>
                    
                    <div className="w-9 h-9 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-none">
                        User
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;