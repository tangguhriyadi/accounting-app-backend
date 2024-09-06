import { Request } from "express";
import { z } from "zod";
import { queryParams } from "../../utils/global_schema";

enum AccountType {
    ASSET = "ASSET",
    LIABILITIES = "LIABILITIES",
    EQUITY = "EQUITY",
    INCOME = "INCOME",
    EXPENSES = "EXPENSES",
}

export const accountParams = z.object({
    id: z.string(),
});

export const createAccountBody = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    type: z.nativeEnum(AccountType),
    budget_id: z.string().optional(),
});

export const accountQuery = queryParams.extend({
    type: z.string().optional(),
});

export type AccountParams = z.infer<typeof accountParams>;
export type CreateAccountBody = z.infer<typeof createAccountBody>;
export type AccountQuery = z.infer<typeof accountQuery>;
export type AccountRequest = Request<
    AccountParams,
    unknown,
    CreateAccountBody,
    AccountQuery
>;
