import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import { loginApi } from "../../api/Auth/loginApi";


function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrormsg] = useState('')
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try{
            const data = await loginApi(email, password)
            localStorage.setItem("token", data.token)
            navigate("/board")
        }catch (err: any){
            setErrormsg(err.message || "⚠ 로그인 실패")
        }
    }
    return (
        <div className="flex items-center justify-center px-4 h-screen bg-gray-100 overflow-hidden">
            <div className="w-full max-w-md min-h-[350px] p-8 bg-white rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="login-form flex flex-col gap-8 flex-grow justify-between">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                            E-mail
                        </label>
                        <input
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="패스워드를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="absolute bottom-[-1.5rem] right-0 text-xs text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button 
                        type="submit"
                        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                        Login
                    </button>
                    {errorMsg && (
                        <div className="text-red-600 text-md font-bold text-center">{errorMsg}</div>
                    )}
                </form>
                {showModal && <ForgotPassword onClose={() => setShowModal(false)} />}
            </div>
        </div>
)
}

export default Login;