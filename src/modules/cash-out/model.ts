import { z } from "zod";
import { QueryParams } from "../../utils/global_schema";
import { Request } from "express";

export const cashOutBody = z.object({
    amount: z.number(),
    description: z.string().optional(),
    account_id: z.string(), // FOR EXPENSES ONLY
});

export type CashOutBody = z.infer<typeof cashOutBody>;

export type CashOutRequest = Request<
    unknown,
    unknown,
    CashOutBody,
    QueryParams
>;
