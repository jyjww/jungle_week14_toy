import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    content!: string

    @ManyToOne(() => User, (user) => user.comments)
    author!: User

    @ManyToOne(() => Post, (post) => post.comments, {
        onDelete: "CASCADE",
    }) 
    post!: Post

    @CreateDateColumn()
    createdAt!: Date

}