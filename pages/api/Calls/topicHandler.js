const date = require("../date.js");
const prisma = require("../prismaClient");
const debate = require("../debate.js");
const user = require("../user.js");
const {getAllTopics, getTopic,topicInsert,deleteTopic,selectTopic,getAllActiveTopics} = require("../topic.js")

export default async function topicHandler(req,res){

if (req.method =="GET") {
  var topics = []
  console.log(req.headers.deepermethod);
  if ( req.headers.deepermethod == "voteRequest"){
   topics = await getAllActiveTopics();
  const topics2 = await getAllTopics();
   console.log("This is with voteRequest"+topics);
      console.log("This is without"+JSON.stringify(topics2));
}else{
     topics = await getAllTopics();
}
console.log(topics);
  res.send(topics);

}else{
  console.log(req.headers.deepermethod);
  const body = JSON.parse(req.body);
const user_id = await user(body.user)
  if (req.headers.deepermethod == "Create"){
    topicInsert(body.topic_name, user_id,true);
 }else if(req.headers.deepermethod == "makeActive") {
    const activeTop = await selectTopic(body.topic_name,true)
    console.log("This is select"+activeTop);
 }
    const topics = await getAllTopics();
console.log(topics);

  res.send(topics);
}


}
