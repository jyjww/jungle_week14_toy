import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt"

{ /* 회원가입 */}
export const createUser = async({ email, name, password }: Partial<User>) => {
    const userRepo = AppDataSource.getRepository(User)

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("해시된 비밀번호 Service:", hashedPassword)
    const newUser = userRepo.create({ email, name, password: hashedPassword })
    
    return await userRepo.save(newUser)
}


{ /* 마이페이지 정보 수정 : 사진, 이름 */}
export const updateUserProfile = async (
    userId: number,
    name?: string,
    profileImageUrl?: string
) => {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({ where: { id: userId }})

    if(!user){
        throw new Error("유저를 찾을 수 없습니다.")
    }

    user.name = name || user.name
    user.profileImageUrl = profileImageUrl || user.profileImageUrl

    return await userRepo.save(user)
}

{ /* 마이페이지 정보 수정 : 비밀번호 */}
export const updatePasswordService = async (
    userId: number,
    currentPassword: string,
    newPassword: string
) => {
    console.log("💡 updatePassword 서비스 진입")
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({ where: { id: userId }})

    if(!user){
        throw new Error("유저를 찾을 수 없습니다.")
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if(!isMatch){
        throw new Error("현재 비밀번호가 일치하지 않습니다.")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    return await userRepo.save(user)
}