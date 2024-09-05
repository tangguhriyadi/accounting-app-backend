import { Router } from "express";
import { errorHandler } from "../../utils/error_handler";
import { authService } from "./service";

const authRoutes: Router = Router();

authRoutes.post("/login", errorHandler(authService.login));

export default authRoutes;
