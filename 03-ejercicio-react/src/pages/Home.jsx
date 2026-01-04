import { Link } from '../components/Link.jsx'
import { useRouter } from '../hooks/useRouter.js'

export function Home() {
    const { navigateTo } = useRouter()

    const handleSearch = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const searchTerm = formData.get('search')

        let targetUrl = '/search'

        if (searchTerm) {
            const encodedTerm = encodeURIComponent(searchTerm)
            targetUrl += `?text=${encodedTerm}`
        }

        navigateTo(targetUrl)
    }

    return (
        <main>
            <section className="hero-section page-width">
                <img src="./background.webp" width="200" alt="" />

                <h1>Encuentra el trabajo de tus sueños</h1>

                <p>Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad.</p>

                <form className="busqueda" role="search" onSubmit={handleSearch}>
                    <div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                            aria-hidden="true"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                        <input 
                            type="text" 
                            name="search"
                            placeholder="Buscar empleos por título, habilidad o empresa" 
                        />
                        <button type="submit">Buscar</button>
                    </div>

                    
                </form>
            </section>

        
        </main>
    )
}