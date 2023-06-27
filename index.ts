import { PrismaClient } from '@prisma/client'
import { dir } from 'console';

const prisma = new PrismaClient();

async function main() {

    //await createData();
    //console.log('user created')

    await updateData();
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true
        },
    });

    console.dir(allUsers, { depth: null });
}

main().then(async () => {

    prisma.$disconnect()
}).catch((err) => {
    console.log(err);
    prisma.$disconnect();
    process.exit(1);
})

async function createData() {

    await prisma.user.create({
        data: {
            name: 'Ahmed',
            email: 'ahmed@outlook.com',
            posts: {
                create: { title: 'Hello World' }
            },
            profile: {
                create: { bio: 'I Like trees' }
            }
        }
    })
}

async function updateData() {
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true }
    })
    console.log(post)
}