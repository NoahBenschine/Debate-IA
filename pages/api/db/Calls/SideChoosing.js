
const {getCurrentDebate,getAllDebates} = require("/src/debate.js");
const {getUserId} = require("/src/user.js");
const {topicInsert, getTopic,getAllTopics} = require("/src/topic.js");
const {sideUpsert,getSides,getSide,deleteAllSides} = require("/src/side.js")



export default async function sideHandler(req,res){
  const  body = JSON.parse(req.body);
  // deleteAllSides();
  const user_id = await getUserId(body.user);
  const debate = await getCurrentDebate();
  const debates = await getAllDebates();
  console.log(debate+"this is the debate");
  console.log(getAllTopics());
  const debate_id = debate.id;
  const topic_id = await getTopic(debate.topic_name);
  const side = await getSide(user_id,debate_id)
  let side_id = -1;
  if(side){side_id = side.id}
  console.log(side_id)
  await sideUpsert(topic_id,user_id,debate_id,body.side,side_id)

  console.log(await getSides(debate_id))
  res.send(await getSides(debate_id));

}
