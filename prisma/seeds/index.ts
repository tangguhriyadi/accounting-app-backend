import { PrismaClient } from "@prisma/client";
import { seedUser } from "./seedUser";
import { seedAccount } from "./seedAccount";

const prisma = new PrismaClient();

async function seed() {
    const userId = await seedUser(prisma);
    await seedAccount(prisma, userId);
}

seed().then(() => {
    console.log("ALL SEEDING DONE");
});
