import { Request } from "express";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const forgotPasswordSchma = z.object({
    email: z.string().email(),
});

export const changePasswordSchema = z.object({
    password: z.string(),
    new_password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchma>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type LoginRequest = Request<
    unknown, // params
    unknown, // res body
    LoginSchema, // req payload
    unknown // req query
>;

export type ForgotPasswordRequest = Request<
    unknown, // params
    unknown, // res body
    ForgotPasswordSchema, // req payload
    unknown // req query
>;

export type ChangePasswordRequest = Request<
    unknown, // params
    unknown, // res body
    ChangePasswordSchema, // req payload
    unknown // req query
>;
