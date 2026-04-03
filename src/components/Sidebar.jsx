import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {LayoutDashboard, ReceiptText, PieChart} from 'lucide-react'
import { useStore} from '../store/useStore'

const Sidebar=() => {
    const { isSidebarOpen, toggleSidebar } = useStore();
    const navigate= useNavigate()
    const location= useLocation()

    const menuItems = [
        {name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        {name: 'Transactions', icon: ReceiptText, path: '/#recent-transactions' },
        {name: 'Insights', icon: PieChart, path: '/insights' },
    ];

    const handleAction= (e, item) => {
        if (window.innerWidth < 1024) toggleSidebar();
        if (item.name === 'Transactions') {
            e.preventDefault()            
            navigate('/#recent-transactions');

            setTimeout(()=> {
                const element = document.getElementById('recent-transactions');
                const container = document.getElementById('main-content');
                if (element && container) {
                    container.scrollTo({
                        top: element.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }

        if (item.name=== 'Dashboard' && location.pathname === '/') {
            navigate('/');
            const container = document.getElementById('main-content');
            if (container) {
                container.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return(
        <>
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
                    onClick={toggleSidebar}
                />
            )}
            <aside className={`bg-slate-900 text-slate-300 h-screen fixed lg:sticky top-0 left-0 z-50 
                transition-all duration-300 flex flex-col 
                ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}`}>
                
                <div className="p-4 font-bold text-white text-xl tracking-tight border-b border-slate-800">
                    {isSidebarOpen ? 'ROYAL FINANCE' : 'RF'}
                </div>
                
                <nav className="flex-1 mt-6 px-3 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.path}
                            onClick={(e) => handleAction(e, item)}
                            className={({ isActive }) => {
                                const isCurrent = (item.name === 'Transactions' && location.hash === '#recent-transactions') ||
                                                (item.name === 'Dashboard' && location.pathname === '/' && location.hash === '') ||
                                                (item.name === 'Insights' && isActive);
                                
                                return `flex items-center w-full p-3 rounded-xl transition-all duration-200 
                                ${isCurrent
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                                    : 'hover:bg-slate-800 hover:text-white text-slate-400'}`;
                            }}>
                            <item.icon size={22}/>
                            {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;