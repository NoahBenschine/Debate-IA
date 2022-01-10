const {Pool} = require("pg");
const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const Topic = require("./topic.js");

const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

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
