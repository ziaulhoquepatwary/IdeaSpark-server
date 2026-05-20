import express from "express";
import { createIdea, deleteIdea, getAllIdeas, getMyIdeas, getIdeaById, updateIdea } from "./idea.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";


const router = express.Router();

router.get('/', getAllIdeas);
router.get("/my-ideas", requireAuth, getMyIdeas);
router.get("/liked", requireAuth, getLikedIdeas);
router.get("/:id", requireAuth, getIdeaById);
router.post("/", requireAuth, createIdea);
router.patch("/:id", requireAuth, updateIdea)
router.delete("/:id", requireAuth, deleteIdea);
router.put("/:id/like", requireAuth, toggleLike);

export default router;