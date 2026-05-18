import Idea from "./idea.model.js";
import { ideaValidationSchema } from "./idea.validation.js";


export const getAllIdeas = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order=req.query.order || "desc";

        const filter = search
            ? {
                title:
                {
                    $regex: search,
                    $options: "i"
                }
            }
            : {};

        const total = await Idea.countDocuments();
        const ideas = await Idea.find(filter)
            .sort({ [sortBy]: order === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            ideas: ideas,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};