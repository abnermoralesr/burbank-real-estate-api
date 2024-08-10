import express from "express";
import { verifyToken } from "#middleware/verifyToken.js";
import { canUpdateAdmin } from "#middleware/canUpdateAdmin.js";
import { createFile, deleteFile, getFile, getFiles, updateFile } from "#controllers/file.controller.js";

const router = express.Router();

router.post("/", verifyToken, createFile);
router.get("/", verifyToken, getFiles);
router.get("/:id", verifyToken, getFile);
router.put("/:id", canUpdateAdmin, updateFile);
router.delete("/:id", canUpdateAdmin, deleteFile);
router.base = "file";

export default router;
