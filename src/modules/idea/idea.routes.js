import express from "express";
import { createIdea, deleteIdea, getAllIdeas, getMyIdeas, getIdeaById, updateIdea, getLikedIdeas, toggleLike } from "./idea.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";


const router = express.Router();

const userAuth = requireAuth()

router.get('/', getAllIdeas);
router.get("/my-ideas", userAuth, getMyIdeas);
router.get("/liked", userAuth, getLikedIdeas);
router.get("/:id", userAuth, getIdeaById);
router.post("/", userAuth, createIdea);
router.patch("/:id", userAuth, updateIdea)
router.delete("/:id", userAuth, deleteIdea);
router.put("/:id/like", userAuth, toggleLike);

export default router;