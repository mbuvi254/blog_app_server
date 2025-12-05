import client from "../config/database.js";
import express, { type Request, type Response } from "express";

interface PublicBlogRequest extends Request {
  params: {
    id: string;
  };
}

export const getPublicBlogs = async (req: PublicBlogRequest, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      where: {
        isDeleted: false,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        synopsis: true,
        featuredImageUrl: true,
        createdAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
            emailAddress: true,
          },
        },
      },
    });
    if (!blogs.length) {
      return res.status(404).json({
        status: "Error",
        message: "No blogs found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: `Found:${blogs.length} blog(s)`,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "No blogs found",
    });
  }
};

export const getPublicBlog = async (req: PublicBlogRequest, res: Response) => {
  try {
    const { id } = req.params;
    const blogId = String(id);
    const blog = await client.blog.findUnique({
      where: {
        id: blogId,
        isDeleted: false,
        isPublished: true,
      },
    });
    if (!blog) {
      return res.status(404).json({
        status: "Error",
        message: "No blog found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: `Found:${blog} blog(s)`,
      blog: blog,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "No blog found",
    });
  }
};
