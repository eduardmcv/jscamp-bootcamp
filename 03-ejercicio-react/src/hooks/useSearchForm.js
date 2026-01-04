import { useState } from 'react'

export function useSearchForm({ onFiltersChange, onTextChange, idTechnology, idLocation, idExperienceLevel }) {
    const [searchText, setSearchText] = useState('')

    const handleChange = (event) => {
        const formData = new FormData(event.currentTarget)

        const filters = {
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experience: formData.get(idExperienceLevel)
        }

        onFiltersChange(filters)
    }

    const handleTextChange = (event) => {
        const text = event.target.value
        setSearchText(text)
        onTextChange(text)
    }

    return {
        searchText,
        handleChange,
        handleTextChange
    }
}