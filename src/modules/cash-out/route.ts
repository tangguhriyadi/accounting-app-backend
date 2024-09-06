import { Router } from "express";
import authMiddlewaare from "../../middlewares/auth";
import { errorHandler } from "../../utils/error_handler";
import { cashOutService } from "./service";

const cashOutRoutes: Router = Router();

cashOutRoutes.post(
    "/asset",
    authMiddlewaare(),
    errorHandler(cashOutService.asset)
);
cashOutRoutes.post(
    "/liabilities",
    authMiddlewaare(),
    errorHandler(cashOutService.liabilities)
);
cashOutRoutes.post(
    "/equity",
    authMiddlewaare(),
    errorHandler(cashOutService.equity)
);
cashOutRoutes.post(
    "/income",
    authMiddlewaare(),
    errorHandler(cashOutService.income)
);
cashOutRoutes.post(
    "/expense",
    authMiddlewaare(),
    errorHandler(cashOutService.expense)
);

export default cashOutRoutes;
