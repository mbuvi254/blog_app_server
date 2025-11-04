import client from "../config/database.js";
import express, {} from "express";
export const createNewBlog = async (req, res) => {
    try {
        const { title, synopsis, featuredImageUrl, content } = req.body;
        const authorId = req.user?.id;
        if (!authorId || !authorId || !title || !synopsis || !content) {
            return res.status(400).json({
                status: "Error",
                message: "Missing fields : AuthorId,title or content"
            });
        }
        const newBlog = await client.blog.create({
            data: {
                authorId,
                title,
                synopsis,
                featuredImageUrl,
                content
            }
        });
        console.log("Blog Created", newBlog);
        return res.status(201).json({
            status: "Success",
            message: "Blog Created Successfuly",
            blog: newBlog
        });
    }
    catch (error) {
        console.log("Blog Not Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Failed to create blog"
        });
    }
};
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await client.blog.findMany({ where: {
                isDelete: false
            } });
        if (!blogs.length) {
            return res.status(404).json({
                status: "Error",
                message: "No blogs found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: `Found:${blogs.length} blog(s)`,
            blogs: blogs
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
        const blogs = await client.blog.findMany({ where: { authorId: authorId } });
        if (blogs.length == 0) {
            return res.status(404).json({
                status: "Error",
                message: "No blogs found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: `Blogs found:${blogs.length}`,
            blogs: blogs
        });
    }
    catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "No blogs found",
        });
    }
};
export const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blogId = String(id);
        const authorId = req.user?.id;
        const blog = await client.blog.findUnique({
            where: { id: blogId, isDelete: false }
        });
        if (!blog) {
            return res.status(404).json({
                status: "Error",
                message: "No blog found",
            });
        }
        ;
        //deny user not author
        if (blog.authorId !== authorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        return res.status(200).json({
            status: "success",
            message: `Blog found`,
            blogs: blog
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
        const blog = await client.blog.findUnique({ where: { id: blogId } });
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
                content
            }
        });
        console.log("Blog Created", updatedBlog);
        return res.status(200).json({
            status: "Success",
            message: "Blog Updated Successfuly",
            user: updatedBlog
        });
    }
    catch (error) {
        console.log("Blog Updated Created:", error);
        return res.status(500).json({
            status: "Error",
            message: "Blog Not Created"
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
            data: { isDelete: true }
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
            message: "Blog Not Created"
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
            data: { isDelete: false }
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
            message: "Blog Not Created"
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
                id: blogId
            }
        });
        if (!blogDeleted) {
            return res.status(404).json({
                status: "Error",
                message: "No blogs found",
            });
        }
        ;
        return res.status(200).json({
            status: "success",
            message: `Blogs found Deleted`
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Blog not delete",
        });
    }
};
//# sourceMappingURL=blogsController.js.map