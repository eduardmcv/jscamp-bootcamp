import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { SearchResultsSection } from '../components/SearchResultsSection.jsx'
import jobsData from '../data/data.json'
import { useDebounce } from '../hooks/useDebounce.js'

const ITEMS_PER_PAGE = 5

export function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [jobs] = useState(jobsData)

    // Inicialización desde URL con lazy initialization
    const [textToFilter, setTextToFilter] = useState(() => {
        return searchParams.get('text') ?? ''
    })

    const [filters, setFilters] = useState(() => {
        return {
            technology: searchParams.get('technology') ?? '',
            location: searchParams.get('location') ?? '',
            experience: searchParams.get('experience') ?? ''
        }
    })

    // Paginación también desde URL
    const [currentPage, setCurrentPage] = useState(() => {
        const pageFromUrl = searchParams.get('page')
        const parsed = parseInt(pageFromUrl, 10)
        return parsed > 0 ? parsed : 1
    })

    const debouncedSearch = useDebounce(textToFilter, 300)

    /* Si bien no hay un problema real de rendimiento, está bueno englobar el filtro en useMemo para evitar re-renderizados innecesarios */
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
        const title = (job.title || '').toLowerCase()
        const company = (job.company || '').toLowerCase()
        const description = (job.description || '').toLowerCase()
        const tags = Array.isArray(job.tags)
            ? job.tags.map((t) => t.toLowerCase().trim())
            : []

        const searchTerm = debouncedSearch.toLowerCase().trim()
        const selectedTech = filters.technology.toLowerCase().trim()
        const selectedLoc = filters.location.toLowerCase().trim()
        const selectedExp = filters.experience.toLowerCase().trim()

        const matchesSearch =
            !searchTerm ||
            title.includes(searchTerm) ||
            company.includes(searchTerm) ||
            description.includes(searchTerm) ||
            tags.some((tag) => tag.includes(searchTerm))

        const jobTechs = tags
        const jobLoc = (job.location || '').toLowerCase().trim()
        const jobExp = (job.experience || '').toLowerCase().trim()

        const techSelected = !selectedTech || jobTechs.includes(selectedTech)
        const locSelected = !selectedLoc || selectedLoc === jobLoc
        const expSelected = !selectedExp || selectedExp === jobExp

        return matchesSearch && techSelected && locSelected && expSelected
    })
    }, [jobs, debouncedSearch, filters])

    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
    const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages)
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Función para actualizar la URL con todos los parámetros
    const updateURL = ({ text, technology, location, experience, page }) => {
        setSearchParams((params) => {
            // El valor que viene como propiedad en `setSearchParams` ya es un objeto `URLSearchParams`, por lo que no es necesario crear uno nuevo
            // const params = new URLSearchParams(prevParams)

            // solo para mostrar una manera diferente de hacer esto, evitando tantos if/else. (Antes también estaba bien)
            const setIfExists = (key, value) => {
                if (value) params.set(key, value)
                else params.delete(key)
            }

            // Texto
            setIfExists('text', text)

            // Filtros
            setIfExists('technology', technology)
            setIfExists('location', location)
            setIfExists('experience', experience)

            // Paginación (solo si es mayor que 1)
            setIfExists('page', page > 1 ? page.toString() : null)

            return params
        })
    }

    // Efecto para actualizar el título del documento
    useEffect(() => {
        const jobCount = filteredJobs.length

        if (textToFilter === '') {
            document.title = `DevJobs - Página ${safeCurrentPage}`
        } else {
            document.title = `${jobCount} trabajos de "${textToFilter}" - Página ${safeCurrentPage}`
        }
    }, [filteredJobs.length, safeCurrentPage, textToFilter])

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters)
        setCurrentPage(1) // Reset a página 1 al cambiar filtros

        updateURL({
            text: textToFilter,
            ...newFilters,
            page: 1
        })
    }

    const handleTextChange = (text) => {
        setTextToFilter(text)
        setCurrentPage(1) // Reset a página 1 al buscar

        updateURL({
            text,
            ...filters,
            page: 1
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)

        updateURL({
            text: textToFilter,
            ...filters,
            page
        })
    }

    return (
        <main>
            <SearchFormSection
                onFiltersChange={handleFiltersChange}
                onTextChange={handleTextChange}
            />
            <SearchResultsSection
                jobs={paginatedJobs}
                totalPages={totalPages}
                currentPage={safeCurrentPage}
                onPageChange={handlePageChange}
            />
        </main>
    )
}

// Export default necesario para React.lazy()
export default Search