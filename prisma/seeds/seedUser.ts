import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

export async function seedUser(prisma: PrismaClient) {
    const exisitingUsers = await prisma.user.findFirst({
        where: {
            is_deleted: false,
            email: "mtangguh97@gmail.com",
        },
    });

    if (!exisitingUsers) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const user = await prisma.user.create({
            data: {
                name: "Muhammad Tangguh Riyadi",
                password: hashedPassword,
                email: "mtangguh97@gmail.com",
                gender: "MALE",
                address:
                    "Cluster Alsagriya E7, Cilame, Ngamprah, Kab. Bandung barat",
                birth_date: new Date("1997-02-10").toISOString(),
                is_verified: true,
                phone: "+6282116780425",
            },
        });

        console.log("user seeded");
        return user.id;
    } else {
        console.log("user has already seeded");
        return exisitingUsers.id;
    }
}
