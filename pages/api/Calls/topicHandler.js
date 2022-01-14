const prisma = require("../prismaClient");
const {getUserId} = require("../user.js");
const {getAllTopics, getTopic,topicInsert,deleteTopic,selectTopic,getAllActiveTopics} = require("../topic.js")

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
  if (req.headers.deepermethod == "Create"){
    topicInsert(body.topic_name, user_id,true);
 }else if(req.headers.deepermethod == "makeActive") {
    const activeTop = await selectTopic(body.topic_name,true)
 }
    const topics = await getAllTopics();

  res.send("Topic is active");
}


}
