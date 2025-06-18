import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

const postRepo = AppDataSource.getRepository(Post)
const userRepo = AppDataSource.getRepository(User)

export const createPostService = async ( userId: number, title: string, content: string ) => {
    const author = await userRepo.findOneBy({ id: userId })
    if (!author) throw new Error("작성자 정보를 찾을 수 없습니다.")

    const post = postRepo.create({ title, content, author })
    return await postRepo.save(post)
}

export const getPostByIdService = async (postId: number) => {
    const post = await postRepo.findOne({
        where: {id: postId},
        relations: ["author", "comments"],
    })
    if (!post) throw new Error("게시글이 존재하지 않습니다.")
    return post
}

export const updatePostService = async (postId: number, title: string, content: string, userId: number) => {
    const postRepo = AppDataSource.getRepository(Post)
    const post = await postRepo.findOne({
        where: {id: postId},
        relations: ["author"],
    })

    if(!post){
        throw new Error("수정할 게시글이 없습니다.");
    }
    if (post.author.id !== userId) {
        throw new Error("작성자만 게시글을 수정할 수 있습니다.");
    }

    post.title = title
    post.content = content

    return await postRepo.save(post)
}

export const deletePostService = async (postId: number, uerId: number) => {
    const postRepo = AppDataSource.getRepository(Post)
    const post = await postRepo.findOne({
        where: {id: postId},
        relations: ["author"],
    })

    if (!post) throw new Error("수정할 게시글이 없습니다.")
    
    await postRepo.remove(post)
}