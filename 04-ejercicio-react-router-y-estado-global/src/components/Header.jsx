import { NavLink, Link } from 'react-router'
import { Link as CustomLink } from './Link.jsx'
import { useAuthStore } from '../store/authStore.js'
import { useFavoritesStore } from '../store/favoritesStore.js'

function UserButton() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const login = useAuthStore((state) => state.login)
    const logout = useAuthStore((state) => state.logout)

    return (
        <>
            {isLoggedIn ? (
                <button onClick={logout} className="auth-button">
                    Cerrar sesión
                </button>
            ) : (
                <button onClick={login} className="auth-button">
                    Iniciar sesión
                </button>
            )}

            {/* Avatar con link al perfil - solo si está logueado */}
            {isLoggedIn && (
                <Link to="/profile" aria-label="Ir a mi perfil" title="Mi perfil">
                    <img
                        src="https://unavatar.io/github/mdo"
                        alt="Avatar del usuario"
                        width="32"
                        height="32"
                    />
                </Link>
            )}
        </>
    )
}

function FavoritesCounter() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const favorites = useFavoritesStore((state) => state.favorites)
    
    if (!isLoggedIn || favorites.length === 0) return null

    return (
        <span className="favorites-badge" title={`${favorites.length} favoritos guardados`}>
            ❤️ {favorites.length}
        </span>
    )
}

export function Header() {
    return (
        <header className="main-header">
            <CustomLink href="/" className="logo-link">
                <h1>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    DevJobs
                </h1>
            </CustomLink>

            <nav>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? 'navLinkActive' : ''}
                    end
                >
                    Inicio
                </NavLink>
                <NavLink 
                    to="/search" 
                    className={({ isActive }) => isActive ? 'navLinkActive' : ''}
                >
                    Empleos
                </NavLink>
            </nav>

            <div className="header-actions">
                <FavoritesCounter />
                <UserButton />
            </div>
        </header>
    )
}