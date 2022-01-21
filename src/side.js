import prisma from "./prismaClient"


async function deleteAllSides(){
const deleted_sides = await prisma.sides.deleteMany({

})
}
async function sideUpsert(topic_id,user_id,debate_id,side,side_id){
  const side_object = await prisma.sides.upsert({
    where: {
      id:side_id
    },
    update: {
      side:side,
    },
    create: {
          topic_id: topic_id,
          owner_id: user_id,
          debate_id: debate_id,
          side: side
        },
  })
  return side_object;
}

async function getSide(user_id,debate_id){
const side = await prisma.sides.findFirst({
  where:{
    debate_id:debate_id,
     owner_id:user_id,
  }
})
return side;
}

async function getSides(debate_id){
 const sides = await prisma.sides.findMany({
     where: {
       debate_id:debate_id
     },
     select: {
        id:true,
        side:true,
        user: {
          select: {
            id:true,
            name:true
          },
        },
      },

   })
   return sides;
}

export {getSide, sideUpsert,getSides,deleteAllSides}
