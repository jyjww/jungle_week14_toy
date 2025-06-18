import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../../api/Auth/requireAuth";
import { fetchMyInfo, updateMyInfo } from "../../api/Auth/mypageApi";
import PasswordChangeModal from "../../components/Auth/PasswordChangeModal";

function Mypage(){
    const [user, setUser] = useState<{ email: string; name: string; profileImageUrl?: string } | null>(null)
    const [name, setName] = useState('')
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    {/* 프로필 이미지 핸들러 함수 */}
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const navigate = useNavigate()
    useEffect(() => {
        requireAuth(navigate)
    }, [])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchMyInfo()
                setUser(data)
                setName(data.name)
            }catch (err:any){
                console.error("유저 정보 불러오기 실패:", err.message)
            }
        }
        loadUser()
    }, [])
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file){
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }
    {/* username @email parsing */}
    const displayName = user?.email?.split('@')[0] || "회원"

    const handleSubmit = async () => {
        const formData = new FormData()
        if(selectedFile){
            formData.append("profileImage", selectedFile)
        }
        formData.append("name", name)

        try {
            const response = await updateMyInfo(formData)
            console.log("업데이트 성공:", response)
        }catch (err:any){
            console.error(err.message)
        }
    }

    { /* 내가 쓴 글에 대한 리스트 보여주기 위한 데이터 추가 후 추가 로직 구현 예정 */ }
    return(
        <div className="flex items-center justify-center px-4 h-screen bg-gray-100 overflow-hidden">
            <div className="w-full max-w-md min-h-[350px] p-8 bg-white rounded-xl shadow-lg">
                <form className="mypage-form flex flex-col gap-6 flex-grow justify-between">
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src = {user?.profileImageUrl
                                    ? `http://localhost:3000${user.profileImageUrl}`
                                    : "http://localhost:3000/uploads/default_profile.jpg"}
                            alt ="profile image"
                            className="w-40 h-40 rounded-full object-cover border"
                        />
                        <div className="flex flex-row items-center gap-4 mt-2">
                            <input
                                type = "file"
                                accept = "image/jpeg, image/png, image/svg+xml"
                                onChange = {handleImageChange}
                                className="text-sm text-gray-600 border border-gray-300 rounded-md"
                            />
                            <button 
                                onClick={handleSubmit} 
                                className="px-3 py-1 bg-gray-200 text-black text-sm rounded-md hover:bg-gray-400 transition"
                            >
                                프로필 저장
                            </button>
                        </div>
                    </div>
                    <h2 
                        className="mypage-header text-2xl font-bold text-center text-gray-800"
                    >
                        {displayName}님 환영합니다!
                    </h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user?.email || ""}
                            readOnly
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="이름을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-600 hover:text-white transition"
                            onClick={() => setIsPasswordModalOpen(true)}
                        >
                            비밀번호 변경하기
                        </button>
                        {isPasswordModalOpen && (
                            <PasswordChangeModal onClose={() => setIsPasswordModalOpen(false)}/>
                        )}
                    </div>
                
                </form>
            </div>
        </div>
    )
}

export default Mypage