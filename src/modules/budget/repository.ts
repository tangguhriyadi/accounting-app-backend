import { AccountType } from "@prisma/client";
import { prisma } from "../../plugins/prisma";
import { QueryParams, transformSortOrder } from "../../utils/global_schema";
import { BudgetBody } from "./model";

export const budgetRepository = {
    findById: async (id: string, user_id: string) => {
        return await prisma.budget.findFirst({
            relationLoadStrategy: "join",
            select: {
                id: true,
                name: true,
                amount: true,
                accounts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                id,
                is_deleted: false,
                created_by: user_id,
            },
        });
    },
    findMany: async (query: QueryParams, user_id: string) => {
        return await prisma.budget.findMany({
            relationLoadStrategy: "join",
            select: {
                id: true,
                name: true,
                amount: true,
                accounts: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                is_deleted: false,
                name: {
                    contains: query.keyword,
                    mode: "insensitive",
                },
                created_by: user_id,
            },
            orderBy: [
                {
                    created_at: transformSortOrder(query.sort_added),
                },
            ],
            take: query.limit,
            skip: (query.page - 1) * query.limit,
        });
    },
    update: async (id: string, body: BudgetBody, user_id: string) => {
        return await prisma.budget.update({
            where: {
                id,
                is_deleted: false,
            },
            data: {
                name: body.name,
                updated_by: user_id,
                amount: body.amount,
            },
        });
    },
    delete: async (id: string, user_id: string) => {
        return await prisma.budget.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date().toISOString(),
                deleted_by: user_id,
                is_deleted: true,
            },
        });
    },
    count: async (keyword: string) => {
        return await prisma.budget.count({
            where: {
                is_deleted: false,
                name: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
        });
    },
    create: async (body: BudgetBody, user_id: string) => {
        return await prisma.budget.create({
            relationLoadStrategy: "join",
            data: {
                name: body.name,
                amount: body.amount,
                created_by: user_id,
                accounts: {
                    create: {
                        type: AccountType.EXPENSES,
                        name: `${AccountType.EXPENSES} - ${body.name}`,
                        created_by: user_id,
                    },
                },
            },
        });
    },
};
