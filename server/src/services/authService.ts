import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source";

export const login = async (email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({where: {email}})

    if(!user) return null

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return null

    // JWT Token 생성
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    )

    return { token, user: { id: user.id, name: user.name, email: user.email }}
}