import {Sun, Moon} from 'lucide-react';
import {useStore} from '../store/useStore';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore();
    return (
        <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all active:scale-95"
        title="Toggle Theme"
        >
        {theme=== 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}

export default ThemeToggle;