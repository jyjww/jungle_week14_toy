import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column("text")
    content!: string

    @Column({default: 0})
    viewed!: number

    @Column({default: 0})
    likes!: number

    @ManyToOne(() => User, (user) => user.posts)
    author!: User

    @CreateDateColumn()
    createdAt!: Date

    @OneToMany(() => Comment, (comment) => comment.post)
    comments!: Comment[]
}