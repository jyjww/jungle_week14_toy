import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import { updatePassword } from "../../api/Auth/mypageApi";
import { useNavigate } from "react-router-dom";

interface Props {
    onClose: () => void
}

const PasswordChangeModal: React.FC<Props> = ({onClose}) => {
    const [origPassword, setOrigPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [errorMsg, setErrormsg] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confPassword){
            setErrormsg('⚠ 비밀번호가 일치하지 않습니다.')
            return
        }
        {/* Server API */}
        try {
            const response = await updatePassword(origPassword, newPassword)
            console.log("비밀번호 변경 성공:", response)
            alert("비밀번호 변경이 완료되었습니다")
            onClose()
            localStorage.removeItem("token")
            navigate('/')
        }catch (err:any){
            console.error(err.message)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
                <h3 className="text-xl font-bold mb-4 text-center">
                    비밀번호 변경
                </h3>
                <div className="w-full space-y-4 flex flex-col items-center">
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="현재 비밀번호"
                            value={origPassword}
                            onChange={(e) => setOrigPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="새로운 비밀번호"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호 중복확인"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errorMsg && <div className="text-red-600 text-sm font-bold text-center">{errorMsg}</div>}
                    <div className="w-full flex justify-between pt-2 gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-1/2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            변경
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordChangeModal