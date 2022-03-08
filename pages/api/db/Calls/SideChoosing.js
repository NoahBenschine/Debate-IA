
import{getCurrentDebate,getAllDebates,addUserToDebate}  from "/src/debate.js";
import {getUserId}  from "/src/user.js";
import {getDate}  from "/src/date.js";
import {topicInsert, getTopic,getAllTopics} from "/src/topic.js";
import  {sideUpsert,getSides,getSide,deleteAllSides} from "/src/side.js";
import { getSession } from "next-auth/react"
import {getAllSessions} from "/src/user.js";

export default async function sideHandler(req,res){

  const debate = await getCurrentDebate(getDate());
  console.log(await getAllDebates());
  let debate_id = ""
if(debate){
    console.log(debate);
 debate_id = debate.id;

}

  if(req.method == "POST" && debate_id != ""){
    const  body = JSON.parse(req.body);
    // deleteAllSides();
    if (debate != null){
        if (debate.present_users == undefined || debate.present_users.indexOf(body.user) == -1){
               await addUserToDebate(body.user,getDate());
      }
    }
    const debate2 = await getCurrentDebate(getDate());
    console.log(debate2);
    console.log("boom")
    const user_id = await getUserId(body.user);
    const topic = await getTopic(debate.topic_name);
    const side = await getSide(user_id,debate_id)
    let side_id = -1;
    console.log(topic);
    if(side){side_id = side.id}
    await sideUpsert(topic.id,user_id,debate_id,body.side,side_id)
        res.send(await getSides(debate_id));
  }else{
      res.send({error:"No debate scheduled"});
  }

}
