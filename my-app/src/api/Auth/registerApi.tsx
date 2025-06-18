export const registerApi = async (email: string, name: string, password: string) => {
    const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email, name, password}),
    })
    console.log("server:",res.status)
    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message || "회원가입 실패")
    }
    const data = await res.json()
    console.log("data:", data)
    // return res.json()
    return data
}