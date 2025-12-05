import express, { type Request, type Response, type NextFunction } from "express";
export declare function verifyToken(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authMiddleware.d.ts.map