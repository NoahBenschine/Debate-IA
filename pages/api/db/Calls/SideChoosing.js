
const {getCurrentDebate,getAllDebates} = require("/src/debate.js");
const {getUserId} = require("/src/user.js");
const {topicInsert, getTopic,getAllTopics} = require("/src/topic.js");
const {sideUpsert,getSides,getSide,deleteAllSides} = require("/src/side.js")



export default async function sideHandler(req,res){

  const debate = await getCurrentDebate();
  const debate_id = debate.id;

  if(req.method == "POST"){
    const  body = JSON.parse(req.body);
    // deleteAllSides();
    const user_id = await getUserId(body.user);
    const topic = await getTopic(debate.topic_name);
    const side = await getSide(user_id,debate_id)
    let side_id = -1;
    if(side){side_id = side.id}
    await sideUpsert(topic.id,user_id,debate_id,body.side,side_id)
        res.send(await getSides(debate_id));
  }else{
      res.send(await getSides(debate_id));
  }

}
