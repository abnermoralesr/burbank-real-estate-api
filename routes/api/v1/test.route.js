import express from "express";
import { shouldBeLoggedIn } from "#controllers/test.controller.js";
import { verifyToken } from "#middleware/verifyToken.js";

const router = express.Router();

router.get("/loggedin", verifyToken, shouldBeLoggedIn);
router.get("/admin", verifyToken, shouldBeLoggedIn);
router.base = "test";

export default router;