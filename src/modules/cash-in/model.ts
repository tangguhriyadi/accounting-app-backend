import { z } from "zod";
import { QueryParams } from "../../utils/global_schema";
import { Request } from "express";

export const cashInBody = z.object({
    amount: z.number().positive(),
    description: z.string().optional(),
    account_id: z.string(), // FOR INCOME OR EQUITY ONLY
});

export type CashInBody = z.infer<typeof cashInBody>;

export type CashInRequest = Request<unknown, unknown, CashInBody, QueryParams>;
