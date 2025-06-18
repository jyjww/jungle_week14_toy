export const loginApi = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "로그인 실패")
    }

    return await res.json()
}