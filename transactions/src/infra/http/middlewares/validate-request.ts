import { type NextFunction, type Request, type Response } from "express";
import z from "zod";

import { InvalidData } from "./errors/invalid-data";

const createTransactionValidationSchema = z.object({
  value: z
    .number({
      required_error: "Value is required.",
      invalid_type_error: "Value must be a number.",
    })
    .min(1, {
      message: "Value must be greater than or equal to 1.",
    }),
  accountTo: z.string({ required_error: "Account to is required." }),
});

export const validateRequest = {
  createTransaction(req: Request, res: Response, next: NextFunction) {
    const { accountTo, value } = req.body;

    const result = createTransactionValidationSchema.safeParse({
      accountTo,
      value,
    });

    if (!result.success) {
      throw new InvalidData(result.error.flatten().fieldErrors);
    }

    next();
  },
};
