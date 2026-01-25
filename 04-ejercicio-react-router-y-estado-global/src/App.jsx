import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

// Lazy load de las páginas
const Home = lazy(() => import('./pages/Home.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const JobDetail = lazy(() => import('./pages/Detail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))

export default function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<p style={{ padding: '2rem', textAlign: 'center' }}>Cargando página...</p>}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          {/* Rutas protegidas - requieren login */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}