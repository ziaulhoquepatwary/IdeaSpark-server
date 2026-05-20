import express from "express";
import { createIdea, getAllIdeas } from "./idea.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";


const router = express.Router();

router.get('/', getAllIdeas);
router.post("/", requireAuth, createIdea);

export default router;