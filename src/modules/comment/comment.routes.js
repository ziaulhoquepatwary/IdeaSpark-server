import express from "express";
import { getCommentsByIdea } from "./comment.controller.js";

const router = express.Router();

router.get("/:ideaId", getCommentsByIdea)

export default router;