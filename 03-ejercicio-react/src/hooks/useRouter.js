import { useState, useEffect } from 'react'

export function useRouter() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', handleLocationChange)

        return () => {
            window.removeEventListener('popstate', handleLocationChange)
        }
    }, [])

    const navigateTo = (path) => {
        window.history.pushState({}, '', path)
        // Emitir evento para que todos los useRouter se actualicen
        const navigationEvent = new PopStateEvent('popstate')
        window.dispatchEvent(navigationEvent)
    }

    const goBack = () => {
        window.history.back()
    }

    const goForward = () => {
        window.history.forward()
    }

    const isActive = (path) => currentPath === path

    const getQueryParams = () => {
        const params = new URLSearchParams(window.location.search)
        return Object.fromEntries(params.entries())
    }

    return {
        currentPath,
        navigateTo,
        goBack,
        goForward,
        isActive,
        queryParams: getQueryParams()
    }
}