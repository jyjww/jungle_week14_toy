import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";

const commentRepo = AppDataSource.getRepository(Comment)
const userRepo = AppDataSource.getRepository(User)
const postRepo = AppDataSource.getRepository(Post)

export const createCommentService = async (postId: number, userId: number, content: string) => {
    const post = await postRepo.findOneBy({ id: postId})
    const user = await userRepo.findOneBy({ id: userId})
    if(!post || !user)  throw new Error("게시글 또는 유저 정보를 찾을 수 없습니다.")

    const newComment = commentRepo.create({content, post, author:user})
    return await commentRepo.save(newComment)
}

export const getCommentByPostIdService = async (postId: number) => {
    return await commentRepo.find({
        where: {post: {id: postId}},
        relations: ["author"],
        order: {createdAt: "ASC"}
    })
}

export const updateCommentService = async (commentId: number, userId: number, content: string) => {
    const comment = await commentRepo.findOne({
        where: {id: commentId },
        relations: ["author"],
    })

    if (!comment) throw new Error("댓글이 존재하지 않습니다.")
    if (comment.author.id !== userId) throw new Error("본인의 댓글만 수정할 수 있습니다.")

    comment.content = content
    return await commentRepo.save(comment)
}

export const deleteCommentService = async (commentId: number, userId: number) => {
    const comment = await commentRepo.findOne({
        where: {id: commentId },
        relations: ["author"],
    })
    console.log("요청한 유저 ID:", userId);
    console.log("댓글 작성자 ID:", comment.author.id);

    if (!comment) throw new Error("댓글이 존재하지 않습니다.")
    if (comment.author.id !== userId) throw new Error("본인의 댓글만 삭제할 수 있습니다.")

    await commentRepo.remove(comment)
}
