import express from "express";
import { createComment, deleteComment, getCommentsByIdea, getMyComments, updateComment } from "./comment.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router = express.Router();

router.get("/my", requireAuth, getMyComments)
router.get("/:ideaId", getCommentsByIdea);
router.post('/:ideaId', requireAuth, createComment);
router.put("/:id", requireAuth, updateComment);
router.delete("/:id", requireAuth, deleteComment);

export default router;