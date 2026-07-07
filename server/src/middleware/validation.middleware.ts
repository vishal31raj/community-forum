import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type RequestSchema = {
  body: unknown;
  params: unknown;
  query: unknown;
};

export function validate<T extends RequestSchema>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
    });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed 1",
        errors: result.error.flatten(),
      });
    }

    req.validated = result.data;

    next();
  };
}
