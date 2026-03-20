// "use client";
import { z } from "zod";
// Form data validation schema
export const formSchemaB = z.object({
	title: z
		.string()
		.min(5, "title must be at least 5 characters.")
		.max(32, "title must be at most 32 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters.")
		.max(100, "Description must be at most 100 characters."),
	publicId: z.string(),
});

export const formSchemaF = z.object({
	title: z
		.string()
		.min(5, "title must be at least 5 characters.")
		.max(32, "title must be at most 32 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters.")
		.max(100, "Description must be at most 100 characters."),
});
