import { useAuthStore } from '../store/authStore.js'
import { useFavoritesStore } from '../store/favoritesStore.js'
import { Link } from 'react-router'
import styles from './profile.module.css'

export function Profile() {
    const logout = useAuthStore((state) => state.logout)
    const favorites = useFavoritesStore((state) => state.favorites)

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Mi Perfil</h1>
            
            <section className={styles.card}>
                <div className={styles.avatar}>
                    <img
                        src="https://unavatar.io/github/mdo"
                        alt="Avatar del usuario"
                        width="80"
                        height="80"
                    />
                </div>
                <div className={styles.info}>
                    <h2>Usuario Demo</h2>
                    <p className={styles.email}>usuario@ejemplo.com</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Mis Favoritos</h2>
                {favorites.length === 0 ? (
                    <p className={styles.empty}>
                        No tienes trabajos guardados. 
                        <Link to="/search" className={styles.link}> Explorar empleos</Link>
                    </p>
                ) : (
                    <p className={styles.count}>
                        Tienes <strong>{favorites.length}</strong> trabajo{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}.
                    </p>
                )}
            </section>

            <section className={styles.section}>
                <h2>Configuración</h2>
                <button onClick={logout} className={styles.logoutButton}>
                    Cerrar sesión
                </button>
            </section>
        </main>
    )
}

export default Profile