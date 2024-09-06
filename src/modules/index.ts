import { Router } from "express";
import authRoutes from "./auth/route";
import accountRoutes from "./account/route";
import budgetRoutes from "./budget/route";

const ApiRoutes: Router = Router();

ApiRoutes.use("/auth", authRoutes)
ApiRoutes.use("/account", accountRoutes)
ApiRoutes.use("/budget", budgetRoutes)

export default ApiRoutes