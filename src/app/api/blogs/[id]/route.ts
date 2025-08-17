import { NextRequest, NextResponse } from "next/server";
import { BlogSchema } from "@/app/schema/blog.schema";
import {
  getBlog,
  updateBlog,
  deleteBlog,
} from "@/app/controller/blog.controller";
import handleError from "@/app/helpers/handleError";
import privateRoute from "@/app/helpers/privateRoute";

// GET handler
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const id = (await params).id;
    const blog = await getBlog({ where: { id } });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return handleError(error, "Failed to fetch blog post");
  }
}

// PUT handler
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return privateRoute(request, async (user) => {
    try {
      const id = (await params).id;
      console.log(user);
      const body = await request.json();
      const validatedData = BlogSchema.parse(body);
      const blog = await updateBlog({
        where: { id },
        data: validatedData,
      });
      return NextResponse.json(blog);
    } catch (error) {
      return handleError(error, "Failed to update blog post");
    }
  });
}

// DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return privateRoute(request, async (user) => {
    try {
      const id = (await params).id;
      console.log(user);
      await deleteBlog({ where: { id } });
      return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
      return handleError(error, "Failed to delete blog post");
    }
  });
}
