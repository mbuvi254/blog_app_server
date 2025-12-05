import { type Request, type Response } from "express";
import type { User } from "@prisma/client";
interface AuthenticatedRequest extends Request {
    user?: User;
}
export declare const getUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUserProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=userController.d.ts.map