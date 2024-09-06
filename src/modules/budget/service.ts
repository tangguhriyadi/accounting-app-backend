import { Response } from "express";
import { budgetBody, budgetParams, BudgetRequest } from "./model";
import { queryParams } from "../../utils/global_schema";
import { budgetRepository } from "./repository";
import { StatusCodes } from "http-status-codes";
import { Pagination } from "../../utils/global_type";
import { success } from "../../response/success";
import { HttpException } from "../../response/exception";

export const BudgetService = {
    findMany: async (req: BudgetRequest, res: Response) => {
        req.query = queryParams.parse(req.query);

        const budgets = await budgetRepository.findMany(req.query, req.user.id);

        // PAGINATION
        const totalCount = await budgetRepository.count(req.query.keyword);
        const totalPage = Math.ceil(totalCount / req.query.limit);

        const pagination: Pagination = {
            page: req.query.page,
            total_page: totalPage,
            total_data: totalCount,
            data_in_page: budgets.length,
        };

        res.status(StatusCodes.OK).json(
            success("Success", budgets, pagination)
        );
    },
    findById: async (req: BudgetRequest, res: Response) => {
        req.params = budgetParams.parse(req.params);

        const budget = await budgetRepository.findById(
            req.params.id,
            req.user.id
        );

        if (!budget) {
            throw new HttpException("Budget not found", StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json(success("Success", budget));
    },
    create: async (req: BudgetRequest, res: Response) => {
        req.body = budgetBody.parse(req.body);

        const createBudget = await budgetRepository.create(
            req.body,
            req.user.id
        );

        res.status(StatusCodes.CREATED).json(success("Success", createBudget));
    },
    update: async (req: BudgetRequest, res: Response) => {
        req.params = budgetParams.parse(req.params);
        req.body = budgetBody.parse(req.body);

        const updateBudget = await budgetRepository.update(
            req.params.id,
            req.body,
            req.user.id
        );

        res.status(StatusCodes.CREATED).json(success("Success", updateBudget));
    },
    delete: async (req: BudgetRequest, res: Response) => {
        req.params = budgetParams.parse(req.params);

        await budgetRepository.delete(req.params.id, req.user.id);

        res.status(StatusCodes.CREATED).json(success("Success", null));
    },
};
