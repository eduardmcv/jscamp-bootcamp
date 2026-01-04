import { Link } from '../components/Link.jsx'

export function NotFound() {
    return (
        <main className="not-found">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe.</p>
            <Link href="/">Volver al inicio</Link>
        </main>
    )
}