import { Router } from "express"
import { verifyToken } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"
import { createComment, deleteComment, getCommentByPostId, updateComment } from "../controllers/commentController"

// controller 에서 가져온다

const router = Router()

router.post("/create", verifyToken, createComment)
router.get("/post/:postId", getCommentByPostId)
router.patch("/update/:id", verifyToken, updateComment)
router.delete("/delete/:id", verifyToken, deleteComment)

export default router