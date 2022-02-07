import {getUserId,getAllSessions,getAllUserIds,getSessionsByDate} from "/src/user.js";
import {getAllTopics, getTopic,topicUpsert,deleteTopic,getAllActiveTopics, turnOffTopic} from "/src/topic.js";
import {getDate} from "/src/date.js";
import {getCurrentDebate} from "/src/debate.js"
import {sideUpsert,getSides,getSide,deleteAllSides} from "/src/side.js";
export default async function topicHandler(req,res){
if (req.method =="GET") {
  var topics = []
  if ( req.headers.deepermethod == "voteRequest"){
  const topics = await getAllActiveTopics();
    const debate = await getCurrentDebate();
    const debate_id = debate.id;
     const active_users = await getSides(debate_id);
   // const users = await getAllSessions();
  // const actual_users = await getAllUserIds();

    // console.log(users)
    // console.log(getDate());
    // console.log(sessions);
    // const date = new Date(2021-12-22)
    // const sessions = await getSessionsByDate(date);
   // console.log(actual_users)
        res.send({active_topics:topics,active_users:active_users});
}else{
     topics = await getAllTopics();

       res.send(topics);
}

}else{
  const body = JSON.parse(req.body);
const user_id = await getUserId(body.user)

  if(req.headers.deepermethod == "ActiveOff"){
    const deactivated_topic = await turnOffTopic(body.topic_name);
    console.log(deactivated_topic);
    const active_topics = await getAllActiveTopics();
    res.send(active_topics);
  }else{
    const topic_object = await topicUpsert(body.topic_name, user_id,true);
    const active_topics = await getAllActiveTopics();
    console.log(topic_object+"this is the otpic object")
      res.send(active_topics);
  }


}


}
