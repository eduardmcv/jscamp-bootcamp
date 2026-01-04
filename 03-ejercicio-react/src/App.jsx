import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Route } from './components/Route.jsx'
import { Home } from './pages/Home.jsx'
import { Search } from './pages/Search.jsx'
import { NotFound } from './pages/NotFound.jsx'

export default function App() {
    return (
        <>
            <Header />
            <Route path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Footer />
        </>
    )
}