import z from "zod";


export const ideaValidationSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters"),
    shortDescription: z
        .string({ required_error: "Short description is required" })
        .min(5, "Short description must be at least 5 characters"),
    detailedDescription: z
        .string({ required_error: "Detailed description is required" })
        .min(10, "Detailed description must be at least 10 characters"),
    category: z.enum(
        ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Other"],
        { required_error: "Category is required" }
    ),
    tags: z.array(z.string()).optional(),
    imageURL: z
        .string()
        .url("Invalid image URL")
        .optional()
        .or(z.literal("")),

    estimatedBudget: z.string().optional(),

    targetAudience: z
        .string({ required_error: "Target audience is required" })
        .min(3, "Target audience must be at least 3 characters"),

    problemStatement: z
        .string({ required_error: "Problem statement is required" })
        .min(10, "Problem statement must be at least 10 characters"),

    proposedSolution: z
        .string({ required_error: "Proposed solution is required" })
        .min(10, "Proposed solution must be at least 10 characters"),
})