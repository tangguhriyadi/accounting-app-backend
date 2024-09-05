import { PrismaClient } from "@prisma/client";

export async function seedAccount(prisma: PrismaClient, id: string) {
    const existingAccount = await prisma.account.findFirst({
        where: {
            created_by: id,
            type: "ASSET",
            name: "Cash",
        },
    });

    if (!existingAccount) {
        await prisma.account.create({
            data: {
                name: "Cash",
                type: "ASSET",
                created_by: id,
            },
        });

        console.log("account seeded");
    } else {
        console.log("account has already seeded");
    }
}
