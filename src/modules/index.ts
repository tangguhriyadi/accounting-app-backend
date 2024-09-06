import { Router } from "express";
import authRoutes from "./auth/route";
import accountRoutes from "./account/route";
import budgetRoutes from "./budget/route";
import cashInRoutes from "./cash-in/route";

const ApiRoutes: Router = Router();

ApiRoutes.use("/auth", authRoutes)
ApiRoutes.use("/account", accountRoutes)
ApiRoutes.use("/budget", budgetRoutes)
ApiRoutes.use("/cash-in", cashInRoutes)

export default ApiRoutes