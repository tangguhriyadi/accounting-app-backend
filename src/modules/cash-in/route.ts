import { Router } from "express";
import authMiddlewaare from "../../middlewares/auth";
import { errorHandler } from "../../utils/error_handler";
import { cashInService } from "./service";

const cashInRoutes: Router = Router();

cashInRoutes.post("/income", authMiddlewaare(), errorHandler(cashInService.income));

export default cashInRoutes;
