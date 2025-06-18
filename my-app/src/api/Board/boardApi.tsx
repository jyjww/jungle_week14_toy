import type { Post } from '../../types';

// 게시글 작성
export const createPostApi = async (title: string, content: string) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("로그인이 필요합니다.")

    const res = await fetch("http://localhost:3000/api/board/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "게시글 생성 실패")
    }

    return await res.json()
}

// 게시글 수정
export const updatePostApi = async (id: number, title: string, content: string) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("로그인이 필요합니다.")
    
    const res = await fetch(`http://localhost:3000/api/board/update/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    })
    if (!res.ok) throw new Error("게시글 수정 실패.")
    return res.json()
}

// 게시글 조회 (단일)
export const getPostById = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/board/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "게시글을 불러오지 못했습니다.")
    }
    return await res.json()
}

// 게시글 조회 (리스트)
export const getPostList = async (): Promise<Post[]> => {
    const res = await fetch ("http://localhost:3000/board", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "글 목록을 불러오지 못했습니다.")
    }
    return await res.json()
}

// 게시글 삭제
export const deletePostApi = async (id: number) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("로그인이 필요합니다.")

    const res = await fetch(`http://localhost:3000/api/board/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "게시글 삭제 실패.")
    }

    return res.json()
}