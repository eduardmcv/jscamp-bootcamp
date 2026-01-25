import { create } from 'zustand'
import { useFavoritesStore } from './favoritesStore.js'

export const useAuthStore = create((set) => ({
    // Estado
    isLoggedIn: false,

    // Login
    login: () => set({ isLoggedIn: true }),

    // Logout - también limpia el estado relacionado con el usuario
    logout: () => {
        // Limpiar favoritos del usuario
        useFavoritesStore.getState().clearFavorites()
        
        // Cerrar sesión
        set({ isLoggedIn: false })
    }
}))