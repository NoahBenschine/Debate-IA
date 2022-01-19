const prisma = require("../prismaClient");
const {getUserId} = require("../src/user.js");
const {getAllTopics, getTopic,topicUpsert,deleteTopic,getAllActiveTopics} = require("../src/topic.js")

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
const topic_object = await topicUpsert(body.topic_name, user_id,true);
console.log(topic_object)

  res.send("Topic is active");
}


}
