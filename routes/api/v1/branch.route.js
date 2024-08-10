import { createBranch, deleteBranch, getBranch, getBranches, updateBranch } from "#controllers/branch.controller.js";
import { verifyToken } from "#middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getBranches);
router.get("/:id", verifyToken, getBranch);
router.post("/", verifyToken, createBranch);
router.put("/:id", verifyToken, updateBranch);
router.delete("/:id", verifyToken, deleteBranch);
router.base = "branch";

export default router;