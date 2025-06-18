import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { createUser, updateUserProfile, updatePasswordService } from "../services/userServices"
import { User } from "../entity/User"
import { AuthRequest } from "../middlewares/authMiddleware"
import bcrypt from "bcrypt"
import { Auth } from "typeorm"

{ /* 회원가입 */}
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, name, password } = req.body

    try {
        const userRepo = AppDataSource.getRepository(User)

        const existing = await userRepo.findOne({where: { email }})
        if(existing) {
            res.status(400).json({ message : "이미 등록된 이메일입니다." })
            return
        }

        await createUser({ email, name, password })
        console.log("Controller ps:", password)

        res.status(201).json({ message : "회원가입 성공" })
        
    }catch(err){
        console.error("회원가입 오류:", err)
        res.status(500).json({ message: "서버 오류", error: err })
        
    }
}

{ /* 마이페이지 정보 불러오기 */}
export const getMyInfo = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({where : {id: req.user!.id}})
        console.log("req.user 값:", req.user)

        if(!user){
            res.status(404).json({ message: "유저를 찾을 수 없습니다." })
        }

        const profileImageUrl = user.profileImageUrl ?? "/uploads/default_profile.jpg"

        const { id, email, name } = user;
        res.json({ id, email, name, profileImageUrl })
    }catch(err){
        console.error("마이페이지 조회 오류:", err)
        res.status(500).json({ message: "서버 오류" })
    }
}

{ /* 마이페이지 정보 수정 : 사진, 이름 */}
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log("💡 updatePassword 컨트롤러 진입")
        const { name } = req.body
        const profileImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined

        const updatedUser = await updateUserProfile(req.user!.id, name, profileImageUrl)

        res.json({ message: "프로필이 업데이트되었습니다.", user: updatedUser })
    } catch (err) {
        console.error("프로필 업데이트 오류:", err)
        res.status(500).json({ message: "서버 오류" })
    }
}

{ /* 마이페이지 정보 수정 : 비밀번호 */}
export const updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
        const { currentPassword, newPassword } = req.body
        const userId = req.user.id

        if(!currentPassword || !newPassword){
            res.status(400).json({ message: "모든 필드를 입력하세요. "})
            return
        }
        try{
            await updatePasswordService(userId, currentPassword, newPassword)
            res.status(201).json({ message: "비밀번호 업데이트 완료"})
        }catch (err){
            console.error("비밀번호 업데이트 오류:", err)
            res.status(500).json({ message: "서버 오류" })
        }
}
