import express from "express";
import { getPastes, createPaste, updatePaste, deletePaste } from "../controllers/pasteController.js";

const router = express.Router();

router.get("/", getPastes);
router.post("/", createPaste);
router.put("/:id", updatePaste);
router.delete("/:id", deletePaste);

export default router;