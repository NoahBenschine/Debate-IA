
import{getCurrentDebate,getAllDebates}  from "/src/debate.js";
import {getUserId}  from "/src/user.js";
import {topicInsert, getTopic,getAllTopics} from "/src/topic.js";
import  {sideUpsert,getSides,getSide,deleteAllSides} from "/src/side.js";
import { getSession } from "next-auth/react"


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
      const session = await getSession({ req })
      // console.log(session);
      // /* ... */
      res.send(session);
  }

}
