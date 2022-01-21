const prisma = require("../prismaClient");
const {getUserId} = require("../src/user.js");
const {getAllTopics, getTopic,topicUpsert,deleteTopic,getAllActiveTopics, turnOffTopic} = require("../src/topic.js")

export default async function topicHandler(req,res){
if (req.method =="GET") {
  var topics = []
  if ( req.headers.deepermethod == "voteRequest"){
   topics = await getAllActiveTopics();
}else{
     topics = await getAllTopics();
}
  res.send(topics);
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
    console.log(topic_object+"this is the otpic object")
      res.send("Topic is active");
  }


}


}
