import express from "express"
import cors from "cors"
import path from "path"
import { AppDataSource } from "./data-source"

import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"
import boardRoutes from "./routes/boardRoutes"
import commentRoutes from "./routes/commentRoutes"
import { upload } from "./middlewares/uploadMiddleware"


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoutes)
app.use("/api", authRoutes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
app.use("/api/board", boardRoutes)
app.use("/board", boardRoutes)
app.use("/api/comment", commentRoutes)


AppDataSource.initialize()
    .then(() => {
        console.log("✅ DB 연결 성공")
        app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`)
        })
    })
    .catch((err) => console.error("❌ DB 연결 실패", err))
