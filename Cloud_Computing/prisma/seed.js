const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function main(){
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
    console.log(user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
