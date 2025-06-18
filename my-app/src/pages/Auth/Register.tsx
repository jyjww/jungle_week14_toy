import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { registerApi } from "../../api/Auth/registerApi";

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMsg, setErrormsg] = useState('');

    const [showPassword, setShowPassword] = useState(false)

    {/* Server API */}
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = await handleCheckEmail()

        if (!isValid) return
        try {
            await registerApi(email, name, password)
            alert("회원가입 성공")
            window.location.href = "/"
        }catch (err: any){
            setErrormsg(err.message)
        }
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleCheckEmail = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (!isValidEmail(email)){
            setErrormsg("유효하지 않은 이메일 형식입니다.")
            resolve(false)
            } else{
                setErrormsg("")
                resolve(true)
            }
        })
    }

    return(
        <div className="flex items-center justify-center px-4 h-screen bg-gray-100 overflow-hidden">
            <div className="w-full max-w-md min-h-[350px] p-8 bg-white rounded-xl shadow-lg">
                <form className="login-form flex flex-col gap-4 flex-grow justify-between" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                            E-mail
                        </label>
                        <input
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                            Name
                        </label>
                        <input
                            type="name" 
                            id="name" 
                            name="name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="닉네임을 입력하세요"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            className="mt-1 w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute mt-3 right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errorMsg && <p className="text-red-600 text-sm text-left">{errorMsg}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register