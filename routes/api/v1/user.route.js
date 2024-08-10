import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "#controllers/user.controller.js";
import { verifyToken } from "#middleware/verifyToken.js";
import { canUpdateAdmin } from "#middleware/canUpdateAdmin.js";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", canUpdateAdmin, updateUser);
router.patch("/:id", canUpdateAdmin, updateUser);
router.delete("/:id", canUpdateAdmin, deleteUser);
router.base = "user";

export default router;
