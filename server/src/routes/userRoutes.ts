import { Router } from "express"
import { getMyInfo, registerUser } from "../controllers/userController"
import { verifyToken } from "../middlewares/authMiddleware"
import { updateProfile } from "../controllers/userController"
import { upload } from "../middlewares/uploadMiddleware"
import { updatePassword } from "../controllers/userController"

const router = Router()

router.post("/register", registerUser)
router.get("/mypage", verifyToken, getMyInfo)
router.patch("/mypage", verifyToken, upload.single("profileImage"), updateProfile)
router.patch("/password", verifyToken, updatePassword)

export default router
