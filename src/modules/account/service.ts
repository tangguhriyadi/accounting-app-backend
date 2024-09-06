import { StatusCodes } from "http-status-codes";
import {
    accountParams,
    accountQuery,
    AccountRequest,
    createAccountBody,
} from "./model";
import { accountRepository } from "./repository";
import { Pagination } from "../../utils/global_type";
import { Response } from "express";
import { success } from "../../response/success";
import { HttpException } from "../../response/exception";

export const accountService = {
    findMany: async (req: AccountRequest, res: Response) => {
        req.query = accountQuery.parse(req.query);

        const accounts = await accountRepository.findMany(
            req.query,
            req.user.id
        );

        // PAGINATION
        const totalCount = await accountRepository.count(req.query.keyword);
        const totalPage = Math.ceil(totalCount / req.query.limit);

        const pagination: Pagination = {
            page: req.query.page,
            total_page: totalPage,
            total_data: totalCount,
            data_in_page: accounts.length,
        };

        res.status(StatusCodes.OK).json(
            success("Success", accounts, pagination)
        );
    },
    findById: async (req: AccountRequest, res: Response) => {
        req.params = accountParams.parse(req.params);

        const account = await accountRepository.findById(
            req.params.id,
            req.user.id
        );

        if (!account) {
            throw new HttpException("Account not found", StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json(success("Success", account));
    },
    create: async (req: AccountRequest, res: Response) => {
        req.body = createAccountBody.parse(req.body);

        const createAccount = await accountRepository.create(
            req.body,
            req.user.id
        );

        res.status(StatusCodes.CREATED).json(success("Success", createAccount));
    },
    update: async (req: AccountRequest, res: Response) => {
        req.params = accountParams.parse(req.params);
        req.body = createAccountBody.parse(req.body);

        const updateAccount = await accountRepository.update(
            req.params.id,
            req.body,
            req.user.id
        );

        res.status(StatusCodes.CREATED).json(success("Success", updateAccount));
    },
    delete: async (req: AccountRequest, res: Response) => {
        req.params = accountParams.parse(req.params);

        await accountRepository.delete(req.params.id, req.user.id);

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
};
