import { PrismaClient } from "@prisma/client";
import { ENV } from "../utils/secrets";

const prismaLogOptsNonProd: any = [
    {
        emit: "stdout",
        level: "query",
    },
    {
        emit: "stdout",
        level: "error",
    },
    {
        emit: "stdout",
        level: "info",
    },
    {
        emit: "stdout",
        level: "warn",
    },
];

const prismaLogOptsProd: any = [
    {
        emit: "stdout",
        level: "error",
    },
    {
        emit: "stdout",
        level: "warn",
    },
];

const prismaLogOpts =
    ENV.NODE_ENV === "production" ? prismaLogOptsProd : prismaLogOptsNonProd;

export class PrismaInstance {
    private static instance: PrismaInstance;
    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient({
            log: prismaLogOpts,
        });
    }

    public static getInstance(): PrismaInstance {
        if (!PrismaInstance.instance) {
            PrismaInstance.instance = new PrismaInstance();
        }
        return PrismaInstance.instance;
    }

    public getPrismaClient(): PrismaClient {
        return this.prisma;
    }
}

export const prisma: PrismaClient =
    PrismaInstance.getInstance().getPrismaClient();
