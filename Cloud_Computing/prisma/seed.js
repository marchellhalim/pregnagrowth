const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const faqs = require('../v1/dataset/faqs.json')

async function main() {
    const role = await prisma.role.createMany({
        data: [
            { name: "admin" },
            { name: "user" }
        ]
    });
    const user = await prisma.user.create({
        data: {
            name: "admin",
            username: 'admin',
            password: 'admin',
            email: 'admin@gmail.com',
            tanggal_lahir:"2021-08-01T00:00:00.000Z",
            roleId: 1
        }
    });
    console.log({user, role});
    const faqq = await prisma.faq.createMany({
        data: faqs
    });
    console.log({faqq});
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
