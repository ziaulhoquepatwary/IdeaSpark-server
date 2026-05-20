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