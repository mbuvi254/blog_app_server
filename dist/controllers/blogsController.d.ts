import express, { type Request, type Response } from "express";
import type { User } from "@prisma/client";
interface AuthenticatedRequest extends Request {
    user?: User;
}
export declare const createNewBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getAllBlogs: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getUserBlogs: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getPublishedBlogs: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const updateBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const trashBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const restoreBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const deleteBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getTrashedBlogs: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getBlogDrafts: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const publishBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const unpublishBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const createComment: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getBlogComments: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=blogsController.d.ts.map