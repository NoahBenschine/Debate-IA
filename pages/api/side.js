
const prisma = require("./prismaClient");



async function sideInsert(topic_id,user_id,debate_id,side){
  const side_object = await prisma.sides.create({
    data: {
      topic_id: topic_id,
      owner_id: user_id,
      debate_id: debate_id,
      side: side
    },
  })
  return side_object;
}

async function changeSide(newside,user_id){
  const updateSide = await prisma.sides.updateMany({
  where: {
     owner_id:user_id,
  },
  data: {
    side:newside,
  },
})
return updateSide;
}

async function getSide(debate_id){
 const sides = await prisma.sides.findMany({
     where: {
       debate_id:debate_id
     },
   })
   return sides;
}

export {getSide, sideInsert,changeSide}
