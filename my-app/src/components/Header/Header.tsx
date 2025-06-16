import { Link } from 'react-router-dom'

function Header() {
    const isLoggedIn = !!localStorage.getItem('token');
    return (
        <nav className="fixed top-0 left-0 w-screen bg-blue-600 px-6 py-4 flex justify-between items-center shadow-md z-50">
            <div className="text-white text-xl font-semibold">MyApp</div>
            <div className="space-x-4">
                <Link 
                    to="/" 
                    className="text-white hover:text-blue-200 transition">
                    Home
                </Link>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem('token')
                            window.location.reload()
                        }}
                        className="text-white hover:text-blue-200 border-0 transition"
                    >
                        Logout
                    </button>

                ) : (
                    <Link
                        to="/login" 
                        className="text-white hover:text-blue-200 transition">
                        Login
                    </Link>
                )}
                {isLoggedIn ? (
                    <Link
                        to="/mypage" 
                        className="text-white hover:text-blue-200 transition"
                    >
                        Mypage
                    </Link>
                ):(
                    <button
                        onClick={() => {
                            alert('로그인이 필요합니다.')
                            window.location.replace("/login")
                        }}
                        className="text-white hover:text-blue-200 border-0 transition"
                    >
                        Mypage
                    </button>
                )}
                <Link 
                    to="/board" 
                    className="text-white hover:text-blue-200 transition">
                    Board
                </Link>
            </div>
        </nav>
    )
}

export default Header
