import { useState, useEffect } from 'react'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { SearchResultsSection } from '../components/SearchResultsSection.jsx'
import jobsData from '../data/data.json'
import { useDebounce } from '../hooks/useDebounce.js'

const ITEMS_PER_PAGE = 5

export function Search() {
    const [jobs] = useState(jobsData)
    const [textToFilter, setTextToFilter] = useState('')
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experience: ''
    })
    const [currentPage, setCurrentPage] = useState(1)

    const debouncedSearch = useDebounce(textToFilter, 300)

    const filteredJobs = jobs.filter((job) => {
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

    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
    const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages)
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Efecto para actualizar el título del documento
    useEffect(() => {
        const jobCount = filteredJobs.length

        // evitamos if/else y queda mas limpio
        document.title = textToFilter === ''
            ? `DevJobs - Página ${safeCurrentPage}`
            : `${jobCount} trabajos de "${textToFilter}" - Página ${safeCurrentPage}`

    }, [filteredJobs.length, safeCurrentPage, textToFilter])

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    const handleTextChange = (text) => {
        setTextToFilter(text)
        setCurrentPage(1)
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
                onPageChange={setCurrentPage}
            />
        </main>
    )
}