import { Request, Response } from "express"
import { AuthRequest } from "../middlewares/authMiddleware"
import * as commentService from "../services/commentService"
import { Auth } from "typeorm"
import { format } from "path"

export const createComment = async (req: AuthRequest, res:Response) => {
    try{
        const userId = req.user.id
        const { postId, content } = req.body
        const newComment = await commentService.createCommentService(postId, userId, content)
    } catch (err:any){
        res.status(500).json({ message: err.message || "댓글 생성 실패" })
    }
}

export const getCommentByPostId = async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId)
        const comments = await commentService.getCommentByPostIdService(postId)

        res.status(200).json(comments)
    } catch (err:any) {
        res.status(400).json({ message: err.message || "댓글 조회 실패" })
    }
}

export const updateComment = async (req: AuthRequest, res: Response) => {
    try {
        const commentId = Number(req.params.id)
        const userId = req.user.id
        const { content } = req.body
        const updated = await commentService.updateCommentService(commentId, userId, content)
        res.json(updated)
    }catch (err:any) {
        res.status(400).json({ message: err.message || "댓글 수정 실패" })
    }
}

export const deleteComment = async (req: AuthRequest, res: Response) => {
    try {
        const commentId = Number(req.params.id)
        const userId = req.user.id
        
        await commentService.deleteCommentService(commentId, userId)
        res.json({ message: "댓글이 삭제되었습니다." })
    } catch (err:any) {
        res.status(400).json({ message: err.message || "댓글 삭제 실패" })
    }
}