const prisma = require("../prismaClient");
const debate = require("../debate.js");
const user = require("../user.js");
const {topicInsert, getTopic} = require("../topic.js");
const {sideInsert,getSide,changeSide} = require("../side.js")



export default async function sideHandler(req,res){
    const  body = JSON.parse(req.body);
  const user_id = await user(body.user);
  const debate = await debate.getDebate();
  const debate_id = debate.id;
 const topic_id = await getTopic(debate.topic_name);
 const side = await getSide(debate_id)
if (side.length == 0){
 console.log(await sideInsert(topic_id,user_id,debate_id,body.side));
}else{
  console.log(await changeSide(body.side,user_id));
}


 console.log(await getSide(debate_id))
 res.send(await getSide(debate_id));
await prisma.$disconnect()
}
