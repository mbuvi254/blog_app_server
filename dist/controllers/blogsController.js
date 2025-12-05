import { error } from "console";
import client from "../config/database.js";
import express, {} from "express";
export const createNewBlog = async (req, res) => {
    try {
        const { title, synopsis, featuredImageUrl, content } = req.body;
        const authorId = req.user?.id;
        if (!authorId || !authorId || !title || !synopsis || !content) {
            return res.status(400).json({
                status: "Error",
                message: "Missing fields : AuthorId,title or content",
            });
        }
        const newBlog = await client.blog.create({
            data: {
                authorId,
                title,
                synopsis,
                featuredImageUrl,
                content,
            },
        });
        console.log("Blog Created", newBlog);
        return res.status(201).json({
            status: "Success",
            message: "Blog Created Successfuly",
            blog: newBlog,
        });
    }
    catch (error) {
        console.log("Blog Not Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create blog",
        });
    }
};
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await client.blog.findMany({
            where: {
                isDeleted: false,
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
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "No blogs found",
        });
    }
};
export const getUserBlogs = async (req, res) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) {
            console.log("Unauthorized: Missing author ID");
            return res.status(401).json({
                status: "Error",
                message: "Unauthorized: Missing author ID",
            });
        }
        const blogs = await client.blog.findMany({
            where: {
                authorId: String(authorId),
                isDeleted: false,
            },
            select: {
                id: true,
                authorId: true,
                title: true,
                synopsis: true,
                featuredImageUrl: true,
                isPublished: true,
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
        return res.status(200).json({
            status: "success",
            message: `Blogs found: ${blogs.length}`,
            blogs: blogs,
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            status: "Error",
            message: "Internal server error",
        });
    }
};
export const getPublishedBlogs = async (req, res) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) {
            console.log("Unauthorized: Missing author ID");
            return res.status(401).json({
                status: "Error",
                message: "Unauthorized: Missing author ID",
            });
        }
        const blogs = await client.blog.findMany({
            where: {
                authorId: String(authorId),
                isDeleted: false,
                isPublished: true,
            },
            select: {
                id: true,
                authorId: true,
                title: true,
                synopsis: true,
                featuredImageUrl: true,
                isPublished: true,
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
        return res.status(200).json({
            status: "success",
            message: `Blogs found: ${blogs.length}`,
            blogs: blogs,
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            status: "Error",
            message: "Internal server error",
        });
    }
};
export const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        const blog = await client.blog.findUnique({
            where: {
                id: blogId,
                isDeleted: false,
            },
            select: {
                id: true,
                authorId: true,
                title: true,
                synopsis: true,
                featuredImageUrl: true,
                isPublished: true,
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
        if (!blog) {
            return res.status(404).json({
                status: "Error",
                message: "No blog found",
            });
        }
        //deny user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
            status: "success",
            message: `Blog found`,
            blogs: blog,
        });
    }
    catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "No blog found",
        });
    }
};
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({
            where: { id: blogId },
            select: {
                id: true,
                authorId: true,
                title: true,
                synopsis: true,
                featuredImageUrl: true,
                isPublished: true,
                createdAt: true,
                lastUpdated: true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                        emailAddress: true,
                    },
                },
            },
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { title, synopsis, featuredImageUrl, content } = req.body;
        const updatedBlog = await client.blog.update({
            where: { id: blogId },
            data: {
                authorId,
                title,
                synopsis,
                featuredImageUrl,
                content,
                lastUpdated: new Date(),
            },
        });
        console.log("Blog Created", updatedBlog);
        return res.status(200).json({
            status: "Success",
            message: "Blog Updated Successfuly",
            user: updatedBlog,
        });
    }
    catch (error) {
        console.log("Blog Updated Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created",
        });
    }
};
export const trashBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny delete if user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const trashBlog = await client.blog.update({
            where: { id: blogId },
            data: { isDeleted: true },
        });
        console.log("Blog Trashed");
        return res.status(201).json({
            status: "Success",
            message: "Blog Trashed Successfuly",
        });
    }
    catch (error) {
        console.log("Blog Updated Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created",
        });
    }
};
export const restoreBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny delete if user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const restoredBlog = await client.blog.update({
            where: { id: blogId },
            data: { isDeleted: false },
        });
        console.log("Blog Restored");
        return res.status(201).json({
            status: "Success",
            message: "Blog Restored Successfuly",
        });
    }
    catch (error) {
        console.log("Blog Updated Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created",
        });
    }
};
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny delete if user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const blogDeleted = await client.blog.delete({
            where: {
                id: blogId,
            },
        });
        if (!blogDeleted) {
            return res.status(404).json({
                status: "Error",
                message: "No blogs found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: `Blogs found Deleted`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Blog not delete",
        });
    }
};
export const getTrashedBlogs = async (req, res) => {
    try {
        const blogs = await client.blog.findMany({
            where: { isDeleted: true },
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
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "No blogs found",
        });
    }
};
export const getBlogDrafts = async (req, res) => {
    try {
        const blogs = await client.blog.findMany({
            where: { isPublished: false, isDeleted: false },
            select: {
                id: true,
                authorId: true,
                title: true,
                synopsis: true,
                featuredImageUrl: true,
                isPublished: true,
                isDeleted: true,
                createdAt: true,
                lastUpdated: true,
                author: { select: { firstName: true, lastName: true } },
            },
        });
        return res.status(200).json({
            status: "success",
            message: `Found ${blogs.length} blog(s)`,
            blogs,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch blogs",
        });
    }
};
export const publishBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny delete if user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const blogPublished = await client.blog.update({
            where: { id: blogId },
            data: { isPublished: true },
        });
        console.log("Blog Published");
        return res.status(201).json({
            status: "Success",
            message: "Blog Published Successfuly",
        });
    }
    catch (error) {
        console.log("Blog Published Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created",
        });
    }
};
//Unpublish Blog
export const unpublishBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        //I get the blog
        const blog = await client.blog.findUnique({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        //deny delete if user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const blogPublished = await client.blog.update({
            where: { id: blogId },
            data: { isPublished: false },
        });
        console.log("Blog Published");
        return res.status(201).json({
            status: "Success",
            message: "Blog Published Successfuly",
        });
    }
    catch (error) {
        console.log("Blog Published Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created",
        });
    }
};
export const createComment = async (req, res) => {
    try {
        const { blogId, comment } = req.body;
        const userId = req.user?.id;
        if (!userId || !blogId || !comment) {
            return res.status(400).json({
                status: "Error",
                message: "Missing fields: userId, blogId or comment",
            });
        }
        const newComment = await client.comment.create({
            data: {
                blogId,
                userId,
                comment,
            },
        });
        return res.status(201).json({
            status: "Success",
            message: "Comment created successfully",
            comment: newComment,
        });
    }
    catch (error) {
        console.log("Comment Not Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create comment",
        });
    }
};
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blogIdString = String(blogId);
        const comments = await client.comment.findMany({
            where: { blogId: blogIdString },
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
            status: "Success",
            message: "Comments fetched successfully",
            comments,
        });
    }
    catch (error) {
        console.log("Comments Not Fetched:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to fetch comments",
        });
    }
};
//# sourceMappingURL=blogsController.js.map