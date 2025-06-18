import { Request, Response } from "express"
import * as authService from "../services/authService"

export const login = async (req: Request, res: Response) : Promise<void> => {
    const { email, password } = req.body;

    try{
        const result = await authService.login(email, password)

        if(!result){
            res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." })
            return
        }

        res.status(200).json(result)
    }catch(error){
        console.error("Login Error:", error)
        res.status(500).json({ message: "서버 에러가 발생했습니다." })
    }
}