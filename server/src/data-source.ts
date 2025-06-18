import { DataSource } from "typeorm"
import "dotenv/config";
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import { Comment } from "./entity/Comment"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"), 
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,       
    database: process.env.DB_NAME, 
    synchronize: true,
    logging: true,
    entities: [User, Post, Comment],
    // entities: ["src/entity/*.ts"],
    migrations: [],
    subscribers: [],
})