import { create} from 'zustand';

export const useStore= create((set)=> ({
    role: 'admin',                
    setRole: (newRole) =>set({ role: newRole}),
    isSidebarOpen: true,
    toggleSidebar: ()=> set((state)=> ({ isSidebarOpen: !state.isSidebarOpen })),
}));