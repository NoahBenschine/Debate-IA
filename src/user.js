import prisma from "./prismaClient"

async function getUserId(user_name){
  console.log(prisma.users)
  console.log(prisma.users.findFirst()+"this is findfirst")
    const user = await prisma.users.findFirst({
        where: {
            name: user_name
        },
    })
    return user.id;
}

async function getAllUserIds(user_name) {
    const user = await prisma.users.findMany({})
    return user;
}

async function getAllSessions() {
    const session = await prisma.session.findMany({})
    return session;
}
async function getSessionsByDate(date) {
    const sessions = await prisma.session.findMany({
      where:{
        expires:{
          gte:date
        }
      }
    })
    return sessions;
}


export {
    getUserId,
    getAllUserIds,
    getAllSessions,
    getSessionsByDate
};
