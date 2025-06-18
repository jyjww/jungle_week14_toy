import { Request, Response } from "express";
import * as boardService from "../services/boardService"
import { AppDataSource } from "../data-source";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Post } from "../entity/Post";

// 게시글 생성
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const userId = req.user.id
        const { title, content } = req.body

        const newPost = await boardService.createPostService(userId, title, content)
        res.status(201).json(newPost)
    }catch(err:any){
        console.error("게시글 생성 실패", err)
        res.status(500).json({ message: err.message || "서버 오류" })
    }
}

// 게시글 조회 (리스트)
export const getAllPosts = async (req: Request, res:Response) => {
    try{
        const postRepo = AppDataSource.getRepository(Post)
        const posts = await postRepo.find({
            relations: ["author"],
            order: {createdAt: "DESC"}
        })
        res.status(200).json(posts)
    }catch(err:any){
        console.error("게시글 목록 조회 실패", err)
        res.status(500).json({ message: err.message || "서버 오류" })
    }
}

// 게시글 조회 (단일)
export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.id)
        const post = await boardService.getPostByIdService(postId)
        res.json(post)
    } catch(err:any) {
        res.status(400).json({ message: err.message || "게시글을 찾을 수 없습니다." })
    }
}

// 게시글 수정
export const updatePost = async (req: AuthRequest, res:Response): Promise<void> => {
    try{
        const postId = Number(req.params.id)
        const { title, content } = req.body
        const userId = req.user.id

        const updated = await boardService.updatePostService(postId, title, content, userId)
        res.json(updated)
    } catch (err:any){
        res.status(400).json({ message: err.message || "게시글 수정 실패" })
    }
}

// 게시글 삭제
export const deletePost = async (req: AuthRequest, res:Response): Promise<void> => {
    try{
        const postId = Number(req.params.id)
        const userId = req.user.id

        await boardService.deletePostService(postId, userId)
        res.json({ message: "게시글이 삭제되었습니다." })
    } catch(err:any) {
        res.status(400).json({ message: err.message || "게시글 삭제 실패" })
    }
}