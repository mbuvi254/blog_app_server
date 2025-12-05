//types/index.d.ts
import "@types/express";
import type { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // <-- EXACT type, optional
    }
  }
}
