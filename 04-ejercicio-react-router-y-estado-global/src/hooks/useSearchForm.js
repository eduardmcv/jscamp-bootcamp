import { useState } from 'react'
import { useSearchParams } from 'react-router'

export function useSearchForm({ onFiltersChange, onTextChange, idTechnology, idLocation, idExperienceLevel }) {
    const [searchParams, setSearchParams] = useSearchParams()

    // Inicialización eficiente: la función solo se ejecuta una vez
    const [searchText, setSearchText] = useState(() => {
        console.log('Inicializar estado de searchText')
        return searchParams.get('text') ?? ''
    })

    const [filters, setFilters] = useState(() => {
        console.log('Inicializar estado de filters')
        return {
            technology: searchParams.get('technology') ?? '',
            location: searchParams.get('location') ?? '',
            experience: searchParams.get('experience') ?? ''
        }
    })

    // Actualizar los parámetros en la URL
    const updateFiltersInURL = ({ text, technology, location, experience }) => {
        setSearchParams((params) => {
            // Usamos set (no append) para evitar duplicados
            if (text) params.set('text', text)
            else params.delete('text')

            if (technology) params.set('technology', technology)
            else params.delete('technology')

            if (location) params.set('location', location)
            else params.delete('location')

            if (experience) params.set('experience', experience)
            else params.delete('experience')

            return params
        })
    }

    const handleChange = (event) => {
        const formData = new FormData(event.currentTarget)

        const newFilters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experience: formData.get(idExperienceLevel)
        }

        setFilters(newFilters)
        onFiltersChange(newFilters)

        // Sincronizar con la URL
        updateFiltersInURL({
            text: searchText,
            ...newFilters
        })
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        setSearchText(text)
        onTextChange(text)

        // Sincronizar con la URL
        updateFiltersInURL({
            text,
            ...filters
        })
    }

    return {
        searchText,
        filters,
        handleChange,
        handleTextChange
    }
}