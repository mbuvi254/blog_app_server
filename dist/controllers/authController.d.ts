import { type Request, type Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}
export declare const registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=authController.d.ts.map