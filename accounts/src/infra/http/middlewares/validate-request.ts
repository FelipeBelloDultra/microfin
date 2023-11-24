import { type NextFunction, type Request, type Response } from "express";
import z from "zod";

import { InvalidData } from "./errors/invalid-data";

const createAccountValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(6, {
      message: "Name must contain at least 6 character(s).",
    })
    .max(255, {
      message: "Name must contain at most 255 character(s).",
    }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Enter a valid email." })
    .min(6, {
      message: "Email must contain at least 6 character(s).",
    })
    .max(255, {
      message: "Email must contain at most 255 character(s).",
    }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, {
      message: "Password must contain at least 6 character(s).",
    })
    .max(255, {
      message: "Password must contain at most 255 character(s).",
    }),
});

const authenticateAccountValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Enter a valid email." })
    .min(6, {
      message: "Email must contain at least 6 character(s).",
    })
    .max(255, {
      message: "Email must contain at most 255 character(s).",
    }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, {
      message: "Password must contain at least 6 character(s).",
    })
    .max(255, {
      message: "Password must contain at most 255 character(s).",
    }),
});

const updateAmountValidationSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .min(1, {
      message: "Amount must be greater than or equal to 1.",
    }),
});

export const validateRequest = {
  authenticateAccount(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const result = authenticateAccountValidationSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      throw new InvalidData(result.error.flatten().fieldErrors);
    }

    next();
  },

  updateAmount(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body;

    const result = updateAmountValidationSchema.safeParse({ amount });

    if (!result.success) {
      throw new InvalidData(result.error.flatten().fieldErrors);
    }

    next();
  },

  createAccount(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;

    const result = createAccountValidationSchema.safeParse({
      email,
      name,
      password,
    });

    if (!result.success) {
      throw new InvalidData(result.error.flatten().fieldErrors);
    }

    next();
  },
};
