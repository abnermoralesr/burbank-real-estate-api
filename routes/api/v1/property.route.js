import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "#controllers/property.controller.js";
import { verifyToken } from "#middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post("/", verifyToken, createProperty);
router.put("/:id", verifyToken, updateProperty);
router.delete("/:id", verifyToken, deleteProperty);
router.base = "property";

export default router;