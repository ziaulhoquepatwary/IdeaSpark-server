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

export const getMyIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find({ authorId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            ideas,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getIdeaById = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found",
            });
        }

        res.json({
            success: true,
            idea,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found",
            });
        }

        if (idea.authorId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You can only edit your own idea.",
            });
        }

        const body = req.body;

        if (typeof body.tags === "string") {
            body.tags = body.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
        }

        // validation
        const parsed = ideaValidationSchema.safeParse(body);

        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            });
        }

        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            parsed.data,
            {
                new: true,
                runValidators: true,
            }
        );

        res.json({
            success: true,
            message: "Idea updated successfully",
            idea: updatedIdea,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteIdea = async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found",
            });
        }

        if (idea.authorId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You can only delete your own ideas.",
            });
        }

        await Idea.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Idea deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
