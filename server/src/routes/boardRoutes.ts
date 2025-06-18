import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/boardController";

const router = Router()

router.post("/create", verifyToken, createPost)
router.get("/", getAllPosts)
router.get("/:id", getPostById)
router.patch("/update/:id", verifyToken, updatePost)
router.delete("/delete/:id", verifyToken, deletePost)


export default router