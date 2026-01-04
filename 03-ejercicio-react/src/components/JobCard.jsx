// Crear componente JobCard
// Importarlo en App.jsx

export function JobCard({ job }) {
    // extraemos las propiedades del objeto job
    const { title, company, location, salary, description, tags } = job

    return (
        <article className="job-card">
            <div>
                <header className="job-card-header">
                    <h3 className="job-title">{title}</h3>
                    <span className="job-tags">{tags.join(', ')}</span>
                    <p className="job-salary">{salary}</p>
                </header>

                <footer className="job-card-body">
                    <div>
                        <p className="job-description">{description}</p>
                    </div>
                    <div className="job-company-info">
                        <p className="job-company">{company}</p>
                        <p className="job-location">{location}</p>
                    </div>
                </footer>
            </div>
            <div>
                <button className="btn-apply">Aplicar</button>
            </div>
        </article>
    )
}

