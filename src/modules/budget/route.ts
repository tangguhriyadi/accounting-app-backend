import { Router } from "express";
import { BudgetService } from "./service";
import { errorHandler } from "../../utils/error_handler";
import authMiddlewaare from "../../middlewares/auth";

const budgetRoutes: Router = Router();

budgetRoutes.get("/", authMiddlewaare(), errorHandler(BudgetService.findMany));
budgetRoutes.get(
    "/:id",
    authMiddlewaare(),
    errorHandler(BudgetService.findById)
);
budgetRoutes.post("/", authMiddlewaare(), errorHandler(BudgetService.create));
budgetRoutes.patch(
    "/:id",
    authMiddlewaare(),
    errorHandler(BudgetService.update)
);
budgetRoutes.delete(
    "/:id",
    authMiddlewaare(),
    errorHandler(BudgetService.delete)
);

export default budgetRoutes;
