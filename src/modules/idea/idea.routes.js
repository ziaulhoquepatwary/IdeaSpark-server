import express from "express";
import { getAllIdeas } from "./idea.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";


const router = express.Router();

router.get('/', getAllIdeas);

export default router;