import client from "../config/database.js";
import express, {} from "express";
export const getPublicBlogs = async (req, res) => {
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
                content: true,
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
            return res.status(200).json({
                status: "success",
                message: "No blogs found",
                blogs: [],
            });
        }
        return res.status(200).json({
            status: "success",
            message: `Found:${blogs.length} blog(s)`,
            blogs: blogs,
        });
    }
    catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "No blogs found",
        });
    }
};
export const getPublicBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await client.blog.findFirst({
            where: {
                id,
                isDeleted: false,
                isPublished: true,
            },
            include: {
                author: {
                    select: { firstName: true, lastName: true, emailAddress: true },
                },
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
            message: "Blog fetched successfully",
            blog,
        });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch blog",
        });
    }
};
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await client.comment.findMany({
            where: { blogId },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return res.status(200).json({
            status: "success",
            message: `${comments.length} comment(s) fetched successfully`,
            comments,
        });
    }
    catch (error) {
        console.error("Comments not fetched:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch comments",
        });
    }
};
//# sourceMappingURL=publicController.js.map