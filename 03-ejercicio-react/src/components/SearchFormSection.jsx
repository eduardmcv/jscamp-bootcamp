import { useId, useState } from 'react'
import { useSearchForm } from '../hooks/useSearchForm.js'

export function SearchFormSection({ onFiltersChange, onTextChange }) {
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()

    const [focusedField, setFocusedField] = useState(null)

    const { searchText, handleChange, handleTextChange } = useSearchForm({
        onFiltersChange,
        onTextChange,
        idTechnology,
        idLocation,
        idExperienceLevel
    })

    const getFieldStyle = (fieldName) => ({
        borderColor: focusedField === fieldName ? '#4f46e5' : '#d1d5db',
        outline: focusedField === fieldName ? '2px solid #4f46e5' : 'none',
        transition: 'border-color 0.2s ease'
    })

    return (
        <section className="jobs-search">
            <h1>Encuentra tu próximo trabajo.</h1>
            <p>Explora miles de oportunidades en el sector tecnológico.</p>

            <form id="empleos-search-form" role="search" onChange={handleChange}>
                <div className="search-bar">
                    <label htmlFor={idText} className="sr-only">Buscar</label>
                    <input
                        name={idText}
                        id={idText}
                        type="text"
                        placeholder="Buscar trabajos, empresas o habilidades"
                        value={searchText}
                        onChange={handleTextChange}
                        onFocus={() => setFocusedField('search')}
                        onBlur={() => setFocusedField(null)}
                        style={getFieldStyle('search')}
                    />
                    {focusedField === 'search' && (
                        <small className="input-hint">
                            Busca por título, empresa o tecnología
                        </small>
                    )}
                </div>

                <div className="search-filters">
                    <select
                        name={idTechnology}
                        id={idTechnology}
                        onFocus={() => setFocusedField('technology')}
                        onBlur={() => setFocusedField(null)}
                        style={getFieldStyle('technology')}
                    >
                        <option value="">Tecnología</option>
                        <optgroup label="Tecnologías populares">
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="react">React</option>
                            <option value="nodejs">Node.js</option>
                        </optgroup>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="c">C</option>
                        <option value="c++">C++</option>
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                    </select>

                    <select
                        name={idLocation}
                        id={idLocation}
                        onFocus={() => setFocusedField('location')}
                        onBlur={() => setFocusedField(null)}
                        style={getFieldStyle('location')}
                    >
                        <option value="">Ubicación</option>
                        <option value="remoto">Remoto</option>
                        <option value="cdmx">Ciudad de México</option>
                        <option value="guadalajara">Guadalajara</option>
                        <option value="monterrey">Monterrey</option>
                        <option value="barcelona">Barcelona</option>
                    </select>

                    <select
                        name={idExperienceLevel}
                        id={idExperienceLevel}
                        onFocus={() => setFocusedField('experience')}
                        onBlur={() => setFocusedField(null)}
                        style={getFieldStyle('experience')}
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
    )
}