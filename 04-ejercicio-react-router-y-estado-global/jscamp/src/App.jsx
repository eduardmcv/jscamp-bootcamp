import { Header } from './components/Header.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { SearchResultsSection } from './components/SearchResultsSection.jsx'
import { Footer } from './components/Footer.jsx'

export default function App() {
  return (
    <>
    <Header />
      <main>
        <section className="jobs-search">
          <h1>Encuentra tu próximo trabajo.</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>

          <form id="empleos-search-form" role="search">
            <div className="search-bar">
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
                name="search"
                id="empleos-search-input"
                type="text"
                placeholder="Buscar trabajos, empresas o habilidades"
              />
            </div>

            <div className="search-filters">
              <select name="technology" id="filter-technology" defaultValue="">
                <option value="">Tecnología</option>
                <optgroup label="Tecnologías populares">
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="react">React</option>
                  <option value="nodejs">Node.js</option>
                </optgroup>
                <option value="java">Java</option>
                {/* ⚠️ En HTML, <hr /> dentro de <select> no es válido.
                    En React lo quitamos para no generar markup inválido. */}
                <option value="csharp">C#</option>
                <option value="c">C</option>
                <option value="c++">C++</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
              </select>

              <select name="location" id="filter-location" defaultValue="">
                <option value="">Ubicación</option>
                <option value="remoto">Remoto</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="guadalajara">Guadalajara</option>
                <option value="monterrey">Monterrey</option>
                <option value="barcelona">Barcelona</option>
              </select>

              <select
                name="experience-level"
                id="filter-experience-level"
                defaultValue=""
              >
                <option value="">Nivel de experiencia</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </form>
        </section>

        <section className="jobs-result">
          <h2>Resultados de búsqueda</h2>

          <ul className="jobs-listings">
            {/* Aquí se insertan los empleos dinámicamente */}
          </ul>

          <nav className="pagination">
            <a
              href="#"
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
            </a>

            <a className="is-active" href="#">
              1
            </a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>

            <a
              href="#"
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </a>
          </nav>
        </section>
      </main>


    </>
  );
}
