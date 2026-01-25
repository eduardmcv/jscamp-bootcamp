import { create } from 'zustand'

export const useFavoritesStore = create((set, get) => ({
    // Estado
    favorites: [],

    // Añadir a favoritos (evita duplicados)
    addFavorite: (jobId) =>
        set((state) => ({
            favorites: state.favorites.includes(jobId)
                ? state.favorites
                : [...state.favorites, jobId]
        })),

    // Eliminar de favoritos
    removeFavorite: (jobId) =>
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== jobId)
        })),

    // Comprobar si es favorito
    isFavorite: (jobId) => {
        const { favorites } = get()
        return favorites.includes(jobId)
    },

    // Alternar favorito
    toggleFavorite: (jobId) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(jobId)) {
            removeFavorite(jobId)
        } else {
            addFavorite(jobId)
        }
    },

    // Contador de favoritos
    getFavoritesCount: () => get().favorites.length,

    // ✨ NUEVO: Limpiar favoritos (para logout)
    clearFavorites: () => set({ favorites: [] })
}))