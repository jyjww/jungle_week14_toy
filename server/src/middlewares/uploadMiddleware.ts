import multer from "multer"
import path from "path"
import fs from "fs"

// 저장할 경로 확인 및 생성
const uploadDir = path.join(__dirname, "../../uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

// multer 저장 설정
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir)
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
    }
})

// 파일 필터
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("이미지 파일만 업로드 가능합니다."))
    }
}

export const upload = multer({ storage, fileFilter })
