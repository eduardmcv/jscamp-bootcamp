import { useFavoritesStore } from '../store/favoritesStore.js'
import { useAuthStore } from '../store/authStore.js'

export function FavoriteButton({ jobId }) {
    // ✅ Suscripción optimizada - solo lo que necesitamos
    const favorites = useFavoritesStore((state) => state.favorites)
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    
    // Calculamos si es favorito a partir del array
    const isJobFavorite = favorites.includes(jobId)

    const handleClick = (event) => {
        event.preventDefault()
        /* No hace falta stopPropagation() */
        // event.stopPropagation()
        
        if (!isLoggedIn) return
        
        toggleFavorite(jobId)
    }

    // Si no está logueado, no mostrar el botón
    if (!isLoggedIn) return null

    return (
        <button
            className={`favorite-btn ${isJobFavorite ? 'is-favorite' : ''}`}
            onClick={handleClick}
            aria-label={isJobFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            title={isJobFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
            {isJobFavorite ? '❤️' : '🤍'}
        </button>
    )
}