const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const Topic = require("./topic.js");


var fnName = async function() {
    // main code
    const user_id = await user();
    const debate_id = await debate.getDebate();
    const topic = await Topic.getTopic("prisons");
    // sideInsert(topic.id,user_id,debate_id,"Pro");
    console.log(await getSide(debate_id));
    // debateInsert("Prisons");

}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}

// const user = await prisma.user.create({
//   data: {
//     email: 'elsa@prisma.io',
//     name: 'Elsa Prisma',
//   },
// })
async function sideInsert(topic_id,user_id,debate_id,side){
  const side_object = await prisma.sides.create({
    data: {
      topic_id: topic_id,
      owner_id: user_id,
      debate_id: debate_id,
      side: side
    },
  })
}


async function getSide(debate_id){
 const sides = await prisma.sides.findMany({
     where: {
       debate_id:debate_id
     },
   })
   return sides;
}

module.exports = {
  getSide: getSide,
  sideInsert: sideInsert
}
