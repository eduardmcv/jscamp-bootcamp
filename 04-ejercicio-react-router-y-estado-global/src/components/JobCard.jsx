import { Link } from '../components/Link.jsx'
import styles from './JobCard.module.css'
import { FavoriteButton } from './FavoriteButton.jsx'

export function JobCard({ job }) {
  return (
    <article className={styles.card}>
      <Link
        href={`/jobs/${job.id}`}
        className={styles.cardLink}
        aria-label={`Ver detalles de ${job.title} en ${job.company}`}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{job.title}</h3>
          {job.isNew && <span className={styles.badge}>Nuevo</span>}
        </div>

        <div className={styles.meta}>
          <p className={styles.company}>
            <span className={styles.icon}>🏢</span>
            {job.company}
          </p>
          <p className={styles.location}>
            <span className={styles.icon}>📍</span>
            {job.location}
          </p>
        </div>

        {job.tags && job.tags.length > 0 && (
          <div className={styles.tags}>
            {job.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.salary}>{job.salary || 'Salario a convenir'}</span>
          <FavoriteButton jobId={job.id} />
        </div>
      </Link>
    </article>
  )
}