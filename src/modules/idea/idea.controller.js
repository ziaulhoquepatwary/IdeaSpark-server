import Idea from "./idea.model.js";
import { ideaValidationSchema } from "./idea.validation.js";


export const getAllIdeas = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";
        const category = req.query.category || "";

        const filter = {};

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        if (category && category !== "All") {
            filter.category = category;
        }

        const total = await Idea.countDocuments(filter);
        const ideas = await Idea.find(filter)
            .sort({ [sortBy]: order === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            ideas,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createIdea = async (req, res) => {
    try {
        const body = req.body;

        // tags: "AI, SaaS, Web3" → ["AI", "SaaS", "Web3"]
        if (typeof body.tags === "string") {
            body.tags = body.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
        }

        const parsed = ideaValidationSchema.safeParse(body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            });
        }

        const newIdea = await Idea.create({
            ...parsed.data,
            authorId: req.user.id,
            authorName: req.user.name,
            likes: [],
        });

        res.status(201).json({
            success: true,
            message: "Idea created successfully",
            idea: newIdea
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}