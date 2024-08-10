import { createLandlord, deleteLandlord, getLandlord, getLandlords, updateLandlord } from "#controllers/landlord.controller.js";
import { verifyToken } from "#middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.get("/", verifyToken, getLandlords);
router.get("/:id", verifyToken, getLandlord);
router.post("/", verifyToken, createLandlord);
router.put("/:id", verifyToken, updateLandlord);
router.delete("/:id", verifyToken, deleteLandlord);
router.base = "landlord";

export default router;