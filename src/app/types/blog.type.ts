import { z } from "zod";
import { BlogSchema } from "../schema/blog.schema";

export type BlogInput = z.infer<typeof BlogSchema>;

export type GetBlogParam = { page?: number; size?: number; search?: string };
