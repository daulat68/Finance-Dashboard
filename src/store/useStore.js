import { create} from 'zustand';

export const useStore= create((set)=> ({

    theme: localStorage.getItem('theme') || 'light',
    
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return { theme: newTheme };
    }),
    
    role: 'admin',                
    setRole: (newRole) =>set({ role: newRole}),
    isSidebarOpen: true,
    toggleSidebar: ()=> set((state)=> ({ isSidebarOpen: !state.isSidebarOpen })),
}));