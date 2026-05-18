import mongoose from "mongoose"

const ideaSchema = new mongoose.Schema(
    {
        title: { type: String, require: true, trim: true },
        shortDescription: { type: String, require: true },
        detailedDescription: { type: String, require: true },
        category: {
            type: String,
            required: true,
            enum: ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Other"],
        },
        tags: [{ type: String }],
        imageURL: { type: String, default: "" },
        estimatedBudget: { type: String, default: "" },
        targetAudience: { type: String, require: true },
        problemStatement: { type: String, required: true },
        proposedSolution: { type: String, required: true },
        authorId: { type: String, required: true },    // Better Auth user id, not mongoose ObjectId
        authorName: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;