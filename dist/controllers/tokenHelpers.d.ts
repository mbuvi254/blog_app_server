import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
export declare function generateToken(id: string, username: string): string;
export declare function verifyToken(req: Request, res: Response, next: NextFunction): express.Response<any, Record<string, any>> | null | undefined;
//# sourceMappingURL=tokenHelpers.d.ts.map