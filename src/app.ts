import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import requestLogger from "./middlewares/request_logger";
import { errorMiddleware } from "./middlewares/error";
import bodyParser from "body-parser";
import { notFound } from "./utils/not_found";
import { healtCheck } from "./utils/health_check";
import ApiRoutes from "./modules";

export const logger = pino({ name: "server start" });
const app = express();

// middlewares
app.use(
    cors({
        origin: ["*"],
        allowedHeaders: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
        methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
    })
);
app.use(helmet());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// request logger
app.use(requestLogger);

// register API routes
app.use("/api", ApiRoutes);
app.get("/", healtCheck);

// route not found handler
app.use(notFound);

// error middleware
app.use(errorMiddleware);

export default app;
