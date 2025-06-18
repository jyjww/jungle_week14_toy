import type { NavigateFunction } from "react-router-dom"

export const requireAuth = (navigate: NavigateFunction) => {
    const token = localStorage.getItem("token")
    if (!token) {
        alert("로그인이 필요합니다")
        navigate("/login")
    }
}

export const isLoggedIn = (navigate: NavigateFunction) => {
    const token = localStorage.getItem("token")
    if (token) {
        navigate("/board")
    }
}