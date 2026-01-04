import { JobListings } from './JobListings.jsx'
import { Pagination } from './Pagination.jsx'

export function SearchResultsSection({ jobs, totalPages, currentPage, onPageChange }) {
    return (
        <section className="jobs-result">
            <h2>Resultados de búsqueda</h2>

            <JobListings jobs={jobs} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </section>
    )
}
