import { useLocation } from "react-router-dom"
import Header from './components/Header/Header'

function AppLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const noHeaderPaths = ["/login", "/signup"]
    const hideHeader = noHeaderPaths.includes(location.pathname)

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        {!hideHeader && <Header />}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 pt-24 overflow-auto">
            {children}
        </main>
        </div>
    )
}

export default AppLayout
