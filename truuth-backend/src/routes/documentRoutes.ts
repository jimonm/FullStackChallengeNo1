import { Router } from "express"
import { upload } from "../middleware/uploadMiddleware"
import { uploadDocument, getDocuments, getDocumentResult } from "../controllers/documentController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = Router()

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument)

router.get("/", authMiddleware, getDocuments)

router.get("/:id/result", authMiddleware, getDocumentResult)

export default router