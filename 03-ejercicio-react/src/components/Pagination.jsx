import styles from './Pagination.module.css'
export function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    const handlePrev = () => {
        if (currentPage === 1) return
        onPageChange(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage === totalPages) return
        onPageChange(currentPage + 1)
    }

    return (
        <nav className={styles.pagination} aria-label="Paginación de resultados">
            {/* Botón anterior */}
            <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Ir a la página anterior de los resultados de búsqueda"
                title="Página anterior"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </button>

            {/* Botones numéricos */}
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? styles.isActive : ''}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Botón siguiente */}
            <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Ir a la página siguiente de los resultados de búsqueda"
                title="Página siguiente"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </button>
        </nav>
    )
}
