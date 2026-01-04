import { JobCard } from './JobCard.jsx'

export function JobListings({ jobs }) {
    return (
        <div className="jobs-listings">
            {jobs.length === 0 && (
                <p>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
            )}

            <div className="jobs-grid">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}
