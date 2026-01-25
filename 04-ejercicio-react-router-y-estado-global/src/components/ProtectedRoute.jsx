import { Navigate } from 'react-router'
import { useAuthStore } from '../store/authStore.js'

/**
 * Componente que protege rutas privadas.
 * Si el usuario no está logueado, redirige a /login (o a la home).
 * Si está logueado, muestra el contenido (children).
 */
export function ProtectedRoute({ children }) {
    // Suscripción optimizada
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    // Si no está logueado, redirigir
    if (!isLoggedIn) {
        // 'replace' evita que el usuario pueda volver atrás a la ruta protegida
        return <Navigate to="/" replace />
    }

    // Si está logueado, mostrar el contenido
    return children
}