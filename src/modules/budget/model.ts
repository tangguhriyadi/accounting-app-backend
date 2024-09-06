import { Request } from "express";
import { z } from "zod";
import { QueryParams } from "../../utils/global_schema";

export const budgetParams = z.object({
    id: z.string(),
});

export const budgetBody = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z.number().positive()
});

export type BudgetParams = z.infer<typeof budgetParams>;
export type BudgetBody = z.infer<typeof budgetBody>;

export type BudgetRequest = Request<
    BudgetParams,
    unknown,
    BudgetBody,
    QueryParams
>;