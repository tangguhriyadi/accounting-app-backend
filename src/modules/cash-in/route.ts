import { Router } from "express";
import authMiddlewaare from "../../middlewares/auth";
import { errorHandler } from "../../utils/error_handler";
import { cashInService } from "./service";

const cashInRoutes: Router = Router();

cashInRoutes.post(
    "/asset",
    authMiddlewaare(),
    errorHandler(cashInService.asset)
);
cashInRoutes.post(
    "/liabilities",
    authMiddlewaare(),
    errorHandler(cashInService.liabilities)
);
cashInRoutes.post(
    "/equity",
    authMiddlewaare(),
    errorHandler(cashInService.equity)
);
cashInRoutes.post(
    "/income",
    authMiddlewaare(),
    errorHandler(cashInService.income)
);
cashInRoutes.post(
    "/expense",
    authMiddlewaare(),
    errorHandler(cashInService.expense)
);

export default cashInRoutes;
