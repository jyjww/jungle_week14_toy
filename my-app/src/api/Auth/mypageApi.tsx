import { Form } from "react-router-dom";

// 마이페이지 내 정보 불러오기
export const fetchMyInfo = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:3000/api/users/mypage", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    if (!token) {
    console.error("토큰이 없습니다.");
    return;
    }

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "유저 정보를 가져올 수 없습니다.")
    }
    return await res.json()
}

// 마이페이지 프로필 수정
export const updateMyInfo = async (formData : FormData) => {
    const token = localStorage.getItem("token")
    if(!token){
        console.error("토큰이 없습니다.")
        return
    }

    const res = await fetch("http://localhost:3000/api/users/mypage", {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "프로필 수정에 실패했습니다.")
    }
    return await res.json()

}

// 마이페이지 비밀번호 수정
export const updatePassword = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem("token")
    if(!token){
        console.error("토큰이 없습니다.")
        return
    }
    const res = await fetch ("http://localhost:3000/api/users/password", {
        method: "PATCH", 
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body : JSON.stringify({ currentPassword, newPassword })
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "비밀번호 수정에 실패했습니다")
    }

    return res.json()
}