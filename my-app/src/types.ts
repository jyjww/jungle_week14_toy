export type User = {
    id: number
    name: string
}

export type Post = {
    id: number
    title: string
    content: string
    viewed: number
    likes: number
    createdAt: string
    author: User
}

export type Comment = {
    id: number
    content: string
    author: User
    post: Post
    createdAt: string
}