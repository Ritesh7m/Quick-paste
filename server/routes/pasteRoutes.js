import express from "express"
import {
  getPastes,
  createPaste,
  updatePaste,
  deletePaste,
  getPasteBySlug,
  getPasteById,
} from "../controllers/pasteController.js"

const router = express.Router()

router.get("/", getPastes)
router.post("/", createPaste)
router.get("/slug/:slug", getPasteBySlug)
router.get("/:id", getPasteById)
router.put("/:id", updatePaste)
router.delete("/:id", deletePaste)

export default router
