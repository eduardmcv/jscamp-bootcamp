import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import snarkdown from "snarkdown";
import styles from "./detail.module.css";
import { useAuthStore } from "../store/authStore.js";
import { useFavoritesStore } from "../store/favoritesStore.js";

// Importamos los datos locales como fallback
import localJobsData from "../data/data.json";

const JobSection = ({ title, content }) => {
  if (!content) return null;
  const html = snarkdown(content ?? "");

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={`${styles.sectionContent} ${styles.prose}`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
};

// Función para buscar en datos locales
function findLocalJob(id) {
  const job = localJobsData.find((j) => j.id === id);
  if (!job) return null;

  // Añadir campos extra que la API tendría
  return {
    ...job,
    content: job.description || "Descripción del puesto no disponible.",
    responsibilities: `
- Desarrollar y mantener código de alta calidad
- Colaborar con el equipo de desarrollo
- Participar en revisiones de código
- Documentar el trabajo realizado
- Cumplir con los plazos establecidos
    `,
    requirements: `
- Experiencia mínima de 2 años en el puesto
- Conocimientos en las tecnologías mencionadas: ${job.tags?.join(", ") || "varias tecnologías"}
- Capacidad de trabajo en equipo
- Buenas habilidades de comunicación
- Inglés nivel intermedio
    `,
    about: `
**${job.company}** es una empresa líder en el sector tecnológico, comprometida con la innovación y el desarrollo de soluciones de vanguardia.

Ofrecemos un ambiente de trabajo dinámico, oportunidades de crecimiento profesional y un equipo apasionado por la tecnología.
    `,
  };
}

export const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Suscripciones optimizadas
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isJobFavorite = favorites.includes(id);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    // Primero intentar con datos locales
    const localJob = findLocalJob(id);

    if (localJob) {
      // Encontrado en datos locales - usar directamente
      setJob(localJob);
      setLoading(false);
      return;
    }

    // Si no está en local, intentar API con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos timeout

    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Job not found");
        }
        return response.json();
      })
      .then((data) => {
        setJob(data);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        // Si falla la API, mostrar error
        setError("No se pudo cargar la oferta");
        setJob(null);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando oferta...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className={styles.notFound}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button
          className={styles.backButton}
          onClick={() => navigate("/search")}
        >
          Volver a la lista de empleos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link to="/search" className={styles.breadcrumbLink}>
              Empleos
            </Link>
          </li>
          <li className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </li>
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
          {job.salary && <p className={styles.salary}>{job.salary}</p>}
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

        <div className={styles.actions}>
          {/* Botón de aplicar */}
          <button
            className={styles.applyButton}
            disabled={!isLoggedIn || applied}
            onClick={() => isLoggedIn && setApplied(true)}
            title={!isLoggedIn ? "Debes iniciar sesión para aplicar" : ""}
          >
            {applied
              ? "Aplicado"
              : isLoggedIn
                ? "Aplicar a esta oferta"
                : "Inicia sesión para aplicar"}
          </button>

          {/* Botón de favoritos - solo si está logueado */}
          {isLoggedIn && (
            <button
              className={`${styles.favoriteButton} ${isJobFavorite ? styles.isFavorite : ""}`}
              onClick={() => toggleFavorite(id)}
              aria-label={
                isJobFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
              }
            >
              {isJobFavorite ? "❤️ Guardado" : "🤍 Guardar"}
            </button>
          )}
        </div>
      </header>

      <JobSection title="Descripción del puesto" content={job.content} />
      <JobSection title="Responsabilidades" content={job.responsibilities} />
      <JobSection title="Requisitos" content={job.requirements} />
      <JobSection title="Acerca de la empresa" content={job.about} />
    </div>
  );
};

export default JobDetail;
