import { useNavigate, useLocation } from 'react-router'

export function useRouter() {
    const navigate = useNavigate()
    const location = useLocation()

    const navigateTo = (path) => {
        navigate(path)
    }

    const isActive = (path) => location.pathname === path

    return {
        currentPath: location.pathname,
        navigateTo,
        isActive
    }
}