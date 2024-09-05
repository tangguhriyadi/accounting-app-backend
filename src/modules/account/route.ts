import { Router } from "express";
import { accountService } from "./service";
import { errorHandler } from "../../utils/error_handler";
import authMiddlewaare from "../../middlewares/auth";

const accountRoutes: Router = Router();

accountRoutes.get(
    "/",
    authMiddlewaare(),
    errorHandler(accountService.findMany)
);
accountRoutes.get(
    "/:id",
    authMiddlewaare(),
    errorHandler(accountService.findById)
);
accountRoutes.post("/", authMiddlewaare(), errorHandler(accountService.create));
accountRoutes.patch(
    "/:id",
    authMiddlewaare(),
    errorHandler(accountService.update)
);
accountRoutes.delete(
    "/:id",
    authMiddlewaare(),
    errorHandler(accountService.delete)
);

export default accountRoutes;
