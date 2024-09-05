import { Router } from "express";
import authRoutes from "./auth/route";
import accountRoutes from "./account/route";

const ApiRoutes: Router = Router();

ApiRoutes.use("/auth", authRoutes)
ApiRoutes.use("/account", accountRoutes)

export default ApiRoutes