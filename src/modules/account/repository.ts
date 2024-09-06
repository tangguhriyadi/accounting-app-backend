import { AccountType } from "@prisma/client";
import { prisma } from "../../plugins/prisma";
import { transformSortOrder } from "../../utils/global_schema";
import { AccountQuery, CreateAccountBody } from "./model";

export const accountRepository = {
    findMany: async (query: AccountQuery, user_id: string) => {
        return await prisma.account.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                budget_id: true,
                type: true,
                budget: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                    },
                },
                created_at: true,
            },
            where: {
                is_deleted: false,
                name: {
                    contains: query.keyword,
                    mode: "insensitive",
                },
                created_by: user_id,
                budget_id: null,
                type: {
                    in: generateTypes(query.type),
                },
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
    findById: async (id: string, user_id: string) => {
        return await prisma.account.findFirst({
            relationLoadStrategy: "join",
            select: {
                id: true,
                name: true,
                description: true,
                budget_id: true,
                type: true,
                budget: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                    },
                },
                created_at: true,
            },
            where: {
                is_deleted: false,
                id,
                created_by: user_id,
                budget_id: null,
            },
        });
    },
    create: async (body: CreateAccountBody, user_id: string) => {
        return await prisma.account.create({
            data: {
                name: body.name,
                budget_id: body.budget_id ?? null,
                created_by: user_id,
                type: body.type,
                description: body.description,
            },
            select: {
                id: true,
                name: true,
            },
        });
    },
    update: async (id: string, body: CreateAccountBody, user_id: string) => {
        return await prisma.account.update({
            where: {
                id,
                is_deleted: false,
            },
            data: {
                name: body.name,
                budget_id: body.budget_id ?? null,
                type: body.type,
                description: body.description,
                updated_by: user_id,
            },
            select: {
                id: true,
                name: true,
            },
        });
    },
    delete: async (id: string, user_id: string) => {
        return await prisma.account.update({
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
        return await prisma.account.count({
            where: {
                is_deleted: false,
                name: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
        });
    },
};

const generateTypes = (types?: string): AccountType[] => {
    if (!types || types.length === 0) return Object.values(AccountType);

    return types?.split(",") as AccountType[];
};
