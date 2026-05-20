import Idea from "../idea/idea.model.js";
import Comment from "./comment.model.js";


export const getCommentsByIdea = async (req, res) => {
    try {
        const comments = await Comment.find({ ideaId: req.params.ideaId })
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim().length < 1) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty.",
            });
        }

        const idea = await Idea.findById(req.params.ideaId);
        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found.",
            });
        }

        const comment = await Comment.create({
            content: content.trim(),
            ideaId: req.params.ideaId,
            ideaTitle: idea.title, 
            authorId: req.user.id,
            authorName: req.user.name,
        });

        res.status(201).json({
            success: true,
            message: "Comment added!",
            comment,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }

        // Owner check
        if (comment.authorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You can only edit your own comments.",
            });
        }

        const { content } = req.body;

        if (!content || content.trim().length < 1) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty.",
            });
        }

        comment.content = content.trim();
        await comment.save();

        res.json({
            success: true,
            message: "Comment updated!",
            comment,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }

        // Owner check
        if (comment.authorId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You can only delete your own comments.",
            });
        }

        await Comment.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Comment deleted.",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyComments = async (req, res) => {
    try {
        const comments = await Comment.find({ authorId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};