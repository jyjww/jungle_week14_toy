import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../../api/Auth/requireAuth";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn(navigate)
    }, [])

    return (
        <div className="flex items-center justify-center px-4 h-screen bg-gray-100 overflow-hidden">
        <div className="w-full max-w-md min-h-[250px] p-8 bg-white rounded-xl shadow-lg flex flex-col justify-between gap-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">Welcome</h2>
            <div className="flex flex-col gap-4">
            <button 
                onClick={() => navigate("/login")}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
                Sign In
            </button>
            <button 
                onClick={() => navigate("/register")}
                className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition"
            >
                Sign Up
            </button>
            </div>
        </div>
        </div>
    );
}

export default Home;
