import { users } from "../db/schema/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: typeof users.$inferSelect;

      validated?: {
        body: unknown;
        params: unknown;
        query: unknown;
      };
    }
  }
}

export {};
