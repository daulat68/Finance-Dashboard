import { LayoutDashboard, ReceiptText, PieChart, UserCircle } from 'lucide-react';
import { useStore} from '../store/useStore';

const Sidebar= () => {
    const {isSidebarOpen } = useStore();
    const menuItems= [
        {name: 'Dashboard', icon: LayoutDashboard, active: true },
        { name: 'Transactions', icon: ReceiptText },
        { name: 'Insights', icon: PieChart },
        { name: 'Profile', icon: UserCircle },
    ]

    return (
        <aside className={`bg-slate-900 text-slate-300 min-h-screen transition-all duration-300 flex flex-col 
        ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 font-bold text-white text-xl tracking-tight border-b border-slate-800">
            {isSidebarOpen? 'ROYAL FINANCE' : 'RF'}
        </div>
        
        <nav className="flex-1 mt-6 px-3 space-y-2">
            {menuItems.map((item)=> (
            <button key={item.name} className={`flex items-center w-full p-3 rounded-xl transition-colors 
            ${item.active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                <item.icon size={22} />
                {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </button>
            ))}
        </nav>
        </aside>
    );
}

export default Sidebar;