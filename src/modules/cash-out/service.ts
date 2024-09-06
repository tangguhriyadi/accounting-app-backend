import { Response } from "express";
import { cashOutBody, CashOutRequest } from "./model";
import { accountRepository } from "../account/repository";
import { HttpException } from "../../response/exception";
import { StatusCodes } from "http-status-codes";
import { AccountType } from "../../utils/global_enum";
import GLOBAL_STATIC from "../../utils/global_static";
import { prisma } from "../../plugins/prisma";
import { JournalSide, JournalType } from "@prisma/client";
import { success } from "../../response/success";

export const cashOutService = {
    asset: async (req: CashOutRequest, res: Response) => {
        req.body = cashOutBody.parse(req.body);

        const currentAccount = await accountRepository.findById(
            req.body.account_id,
            req.user.id
        );

        if (!currentAccount) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        const isAssetAccount = currentAccount?.type == AccountType.ASSET;

        if (!isAssetAccount) {
            throw new HttpException(
                "Account is not valid",
                StatusCodes.NOT_FOUND
            );
        }

        const cashAccount = await prisma.account.findFirst({
            where: {
                name: GLOBAL_STATIC.CASH,
                is_deleted: false,
            },
        });

        if (!cashAccount) {
            throw new HttpException(
                "You don't have a Cash Account",
                StatusCodes.BAD_REQUEST
            );
        }

        await prisma.journal.create({
            relationLoadStrategy: "join",
            data: {
                type: JournalType.GENERAL_JOURNAL,
                description: req.body.description,
                accounts: {
                    createMany: {
                        data: [
                            {
                                account_id: req.body.account_id,
                                side: JournalSide.DEBIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                            {
                                account_id: cashAccount.id,
                                side: JournalSide.CREDIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                        ],
                    },
                },
                created_by: req.user.id,
            },
        });

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
    liabilities: async (req: CashOutRequest, res: Response) => {
        req.body = cashOutBody.parse(req.body);

        const currentAccount = await accountRepository.findById(
            req.body.account_id,
            req.user.id
        );

        if (!currentAccount) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        const isLiabilitiesAccount =
            currentAccount?.type == AccountType.LIABILITIES;

        if (!isLiabilitiesAccount) {
            throw new HttpException(
                "Account is not valid",
                StatusCodes.NOT_FOUND
            );
        }

        const cashAccount = await prisma.account.findFirst({
            where: {
                name: GLOBAL_STATIC.CASH,
                is_deleted: false,
            },
        });

        if (!cashAccount) {
            throw new HttpException(
                "You don't have a Cash Account",
                StatusCodes.BAD_REQUEST
            );
        }

        await prisma.journal.create({
            relationLoadStrategy: "join",
            data: {
                type: JournalType.GENERAL_JOURNAL,
                description: req.body.description,
                accounts: {
                    createMany: {
                        data: [
                            {
                                account_id: req.body.account_id,
                                side: JournalSide.DEBIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                            {
                                account_id: cashAccount.id,
                                side: JournalSide.CREDIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                        ],
                    },
                },
                created_by: req.user.id,
            },
        });

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
    equity: async (req: CashOutRequest, res: Response) => {
        req.body = cashOutBody.parse(req.body);

        const currentAccount = await accountRepository.findById(
            req.body.account_id,
            req.user.id
        );

        if (!currentAccount) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        const isEquityAccount = currentAccount?.type == AccountType.EQUITY;

        if (!isEquityAccount) {
            throw new HttpException(
                "Account is not valid",
                StatusCodes.NOT_FOUND
            );
        }

        const cashAccount = await prisma.account.findFirst({
            where: {
                name: GLOBAL_STATIC.CASH,
                is_deleted: false,
            },
        });

        if (!cashAccount) {
            throw new HttpException(
                "You don't have a Cash Account",
                StatusCodes.BAD_REQUEST
            );
        }

        await prisma.journal.create({
            relationLoadStrategy: "join",
            data: {
                type: JournalType.GENERAL_JOURNAL,
                description: req.body.description,
                accounts: {
                    createMany: {
                        data: [
                            {
                                account_id: req.body.account_id,
                                side: JournalSide.DEBIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                            {
                                account_id: cashAccount.id,
                                side: JournalSide.CREDIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                        ],
                    },
                },
                created_by: req.user.id,
            },
        });

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
    income: async (req: CashOutRequest, res: Response) => {
        req.body = cashOutBody.parse(req.body);

        const currentAccount = await accountRepository.findById(
            req.body.account_id,
            req.user.id
        );

        if (!currentAccount) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        const isIncomeAccount = currentAccount?.type == AccountType.INCOME;

        if (!isIncomeAccount) {
            throw new HttpException(
                "Account is not valid",
                StatusCodes.NOT_FOUND
            );
        }

        const cashAccount = await prisma.account.findFirst({
            where: {
                name: GLOBAL_STATIC.CASH,
                is_deleted: false,
            },
        });

        if (!cashAccount) {
            throw new HttpException(
                "You don't have a Cash Account",
                StatusCodes.BAD_REQUEST
            );
        }

        await prisma.journal.create({
            relationLoadStrategy: "join",
            data: {
                type: JournalType.GENERAL_JOURNAL,
                description: req.body.description,
                accounts: {
                    createMany: {
                        data: [
                            {
                                account_id: req.body.account_id,
                                side: JournalSide.DEBIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                            {
                                account_id: cashAccount.id,
                                side: JournalSide.CREDIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                        ],
                    },
                },
                created_by: req.user.id,
            },
        });

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
    expense: async (req: CashOutRequest, res: Response) => {
        req.body = cashOutBody.parse(req.body);

        const currentAccount = await accountRepository.findById(
            req.body.account_id,
            req.user.id
        );

        if (!currentAccount) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        const isExpenseAccount = currentAccount?.type == AccountType.EXPENSES;

        if (!isExpenseAccount) {
            throw new HttpException(
                "Account is not valid",
                StatusCodes.NOT_FOUND
            );
        }

        const cashAccount = await prisma.account.findFirst({
            where: {
                name: GLOBAL_STATIC.CASH,
                is_deleted: false,
            },
        });

        if (!cashAccount) {
            throw new HttpException(
                "You don't have a Cash Account",
                StatusCodes.BAD_REQUEST
            );
        }

        await prisma.journal.create({
            relationLoadStrategy: "join",
            data: {
                type: JournalType.GENERAL_JOURNAL,
                description: req.body.description,
                accounts: {
                    createMany: {
                        data: [
                            {
                                account_id: req.body.account_id,
                                side: JournalSide.DEBIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                            {
                                account_id: cashAccount.id,
                                side: JournalSide.CREDIT,
                                amount: req.body.amount,
                                created_by: req.user.id,
                            },
                        ],
                    },
                },
                created_by: req.user.id,
            },
        });

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
};
