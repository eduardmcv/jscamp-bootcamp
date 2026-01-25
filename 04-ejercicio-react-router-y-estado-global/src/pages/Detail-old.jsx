import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import snarkdown from 'snarkdown'
import styles from './detail.module.css'

const JobSection = ({ title, content }) => {
  const html = snarkdown(content ?? '')

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={`${styles.sectionContent} ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  )
}

// Recibe isLoggedIn como prop (prop drilling desde App)
export const JobDetail = ({ isLoggedIn }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Job not found')
        }
        return response.json()
      })
      .then((data) => {
        setJob(data)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setError(error.message)
        setJob(null)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando oferta...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className={styles.notFound}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button className={styles.backButton} onClick={() => navigate('/search')}>
          Volver a la lista de empleos
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link to="/search" className={styles.breadcrumbLink}>
              Empleos
            </Link>
          </li>
          <li className={styles.breadcrumbSeparator} aria-hidden="true">/</li>
          <li aria-current="page" className={styles.breadcrumbCurrent}>
            {job.title}
          </li>
        </ol>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{job.title}</h1>
        <div className={styles.meta}>
          <p className={styles.company}>{job.company}</p>
          <p className={styles.location}>{job.location}</p>
        </div>

        {/* Botón de aplicar - condicionado a isLoggedIn */}
        <button 
          className={styles.applyButton} 
          disabled={!isLoggedIn}
          title={!isLoggedIn ? 'Debes iniciar sesión para aplicar' : ''}
        >
          {isLoggedIn ? 'Aplicar a esta oferta' : 'Inicia sesión para aplicar'}
        </button>
      </header>

      <JobSection title="Descripción del puesto" content={job.content} />

      <JobSection title="Responsabilidades" content={job.responsibilities} />

      <JobSection title="Requisitos" content={job.requirements} />

      <JobSection title="Acerca de la empresa" content={job.about} />
    </div>
  )
}

// Export default necesario para React.lazy()
export default JobDetail