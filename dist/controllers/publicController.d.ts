import express, { type Request, type Response } from "express";
interface PublicBlogRequest extends Request {
    params: {
        id: string;
    };
}
export declare const getPublicBlogs: (req: PublicBlogRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getPublicBlog: (req: PublicBlogRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
interface BlogCommentsRequest extends Request {
    params: {
        blogId: string;
    };
}
export declare const getBlogComments: (req: BlogCommentsRequest, res: Response) => Promise<express.Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=publicController.d.ts.map