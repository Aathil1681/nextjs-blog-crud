import { Prisma, Blog } from "@prisma/client";
import prisma from "../../lib/prisma";

// Create a blog (with optional image)
export async function createBlog(args: Prisma.BlogCreateArgs): Promise<Blog> {
  return prisma.blog.create(args);
}

// Get a single blog
export async function getBlog(
  args: Prisma.BlogFindUniqueArgs,
): Promise<Blog | null> {
  return prisma.blog.findUnique(args);
}

// Get multiple blogs
export async function getBlogs(args: Prisma.BlogFindManyArgs): Promise<Blog[]> {
  return prisma.blog.findMany(args);
}

// Update a blog (including image)
export async function updateBlog(args: Prisma.BlogUpdateArgs): Promise<Blog> {
  return prisma.blog.update(args);
}

// Delete a blog
export async function deleteBlog(args: Prisma.BlogDeleteArgs): Promise<Blog> {
  return prisma.blog.delete(args);
}

// Count blogs
export async function getBlogsCount(
  args: Prisma.BlogCountArgs,
): Promise<number> {
  return prisma.blog.count(args);
}

/*
 
 *Return types are explicit (Promise<Blog> or Promise<Blog[]>) → helps with autocompletion and prevents misuse.

 *Grouped into one service file → consistent structure for CRUD.

 *You still get Prisma's type safety without repeating logic everywhere.

 */
