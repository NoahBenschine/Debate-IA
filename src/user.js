const prisma = require("./prismaClient");

async function getUserId(user_name) {
    const user = await prisma.users.findFirst({
        where: {
            name: user_name
        },
    })
    return user.id;
}

async function getAllUserIds(user_name) {
    const user = await prisma.users.findMany({})
    return user.id;
}


export {
    getUserId,
    getAllUserIds
};
