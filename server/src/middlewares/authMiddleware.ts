import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request{
    user?: { id: number },
    file?: Express.Multer.File
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({ message: "인증 정보가 없습니다." })
        return
    }

    const token = authHeader.split(" ")[1]
    console.log("헤더에서 추출한 토큰:", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }
        req.user = { id: decoded.id }
        console.log("디코딩된 payload:", decoded)
        next()
    }catch(err){
        res.status(403).json({ message: "토큰이 유효하지 않습니다." })
    }
}