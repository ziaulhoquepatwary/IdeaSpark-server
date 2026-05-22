import express from "express";
import { createComment, deleteComment, getCommentsByIdea, getMyComments, updateComment } from "./comment.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = express.Router();

const userAuth = requireAuth()

router.get("/my", userAuth, getMyComments)
router.get("/:ideaId", getCommentsByIdea);
router.post('/:ideaId', userAuth, createComment);
router.put("/:id", userAuth, updateComment);
router.delete("/:id", userAuth, deleteComment);

export default router;