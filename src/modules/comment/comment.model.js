import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true, trim: true, },
        ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true, },
        authorId: { type: String, required: true, },
        authorName: { type: String, required: true, }
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;