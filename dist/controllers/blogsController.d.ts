import express, { type Request, type Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}
export declare const createNewBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getAllBlogs: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getUserBlogs: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const updateBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const trashBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const restoreBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const deleteBlog: (req: AuthenticatedRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=blogsController.d.ts.map