import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto (no lo exportamos, es detalle interno)
const AuthContext = createContext()

// 2. Custom hook para consumir el contexto
// Esta es la ÚNICA forma de acceder al contexto desde fuera
export function useAuth() {
    const context = useContext(AuthContext)

    // Validación: si se usa fuera del Provider, error claro
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }

    return context
}

// 3. Provider que envuelve la app
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function login() {
        setIsLoggedIn(true)
    }

    function logout() {
        setIsLoggedIn(false)
    }

    const value = {
        isLoggedIn,
        login,
        logout
    }

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}