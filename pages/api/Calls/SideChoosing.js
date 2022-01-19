const prisma = require("../prismaClient");
const {getDebate} = require("../debate.js");
const {getUserId} = require("../user.js");
const {topicInsert, getTopic} = require("../topic.js");
const {sideUpsert,getSides,getSide} = require("../side.js")



export default async function sideHandler(req,res){
    const  body = JSON.parse(req.body);
  const user_id = await getUserId(body.user);
  const debate = await getDebate();
  const debate_id = debate.id;
 const topic_id = await getTopic(debate.topic_name);
 const side = await getSide(user_id,debate_id)


 await sideUpsert(topic_id,user_id,debate_id,body.side,side.id)

 console.log(await getSides(debate_id))
 res.send(await getSides(debate_id));
await prisma.$disconnect()
}
