const {Pool} = require("pg");
const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const getTopic = require("./topic.js");
const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

var fnName = async function() {
    // main code
    const user_id = await user();
    const debate_id = await debate();
    const topic = await getTopic();
    // sideInsert(topic.id,user_id,debate_id,"Pro");
    console.log(await getSide(debate_id));
    // debateInsert("Prisons");

}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}


function sideInsert(topic_id,user_id,debate_id,side){
  const text = 'INSERT INTO sides(topic_id,owner_id,debate_id,side) VALUES($1,$2,$3,$4) RETURNING *'
  const values = [topic_id,user_id,debate_id,side]
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
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
