const BASE_URL = "http://localhost:3000/api/comment"

export const getCommentByPostApi = async (postId: number): Promise<Comment[]> => {
    const res = await fetch(`${BASE_URL}/post/${postId}`)
    if (!res.ok) throw new Error("댓글 조회 실패")
    return res.json()
}

export const createCommentApi = async (postId: number, content: string) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("로그인이 필요합니다.")

    const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ postId, content })
    })

    if (!res.ok) throw new Error("댓글 생성 실패")
    return res.json()
}

export const updateCommentApi = async(commentId: number, content: string) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("로그인이 필요합니다.")

    const res = await fetch(`${BASE_URL}/update/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    })

    if (!res.ok) throw new Error("댓글 수정 실패")
    return res.json()
}

export const deleteCommentApi = async (commentId: number) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("로그인이 필요합니다.")

    const res = await fetch(`${BASE_URL}/delete/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    if (!res.ok) throw new Error("댓글 삭제 실패")
    return res.json()
}