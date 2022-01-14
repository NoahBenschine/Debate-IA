const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");


export default async function topicHandler(req,res){

const topics = await getAllTopics();
console.log("These are the topics"+topics);
res.send(topics);

}



async function getTopic(name){
 const topic = await prisma.topic.findFirst({
     where: {
       name:name
     },
   })
   return topic.id;
}

async function getTopicName(topic_id){
 const topic = await prisma.topic.findFirst({
     where: {
       id:topic_id
     },
   })
   return topic.name;
}

async function getAllTopics(){
 const topic = await prisma.topic.findMany({

   })
   return topic;
}


async function getAllActiveTopics(){
 const topic = await prisma.topic.findMany({
  where :{
    active:true
  }
   })
   return topic;
}

async function turnOffActives(winner){
  const activeTopic = await prisma.topic.updateMany({
    where:{
      AND: [
            {
              NOT: {
                id:{
                  equals:winner
                }
              },
            },
            {
              active: {
                equals: true,
              },
            },
          ],


    },
    data:{
      active:false
    }

  })
  return activeTopic;
}
 async function topicInsert(name,owner_id,active_type){
  const topic_object = await prisma.topic.create({
    data: {
      name: name,
      owner_id: owner_id,
      active: active_type
    },
  })
}

async function selectTopic(name,active_type){
  const updateVote = await prisma.topic.update({
  where: {
     name: name,
  },
  data: {
    active:active_type
  },
})
return updateVote
}


 async function deleteTopic(name){
  const topic = await prisma.topic.deleteMany({
    where: {
      name: name,
    },
  })
}


// module.exports = {
//     getTopic: getTopic,
//     topicInsert: topicInsert,
//     deleteTopic: deleteTopic
// };
export {getAllTopics,getTopicName, getTopic,topicInsert,deleteTopic,selectTopic,getAllActiveTopics, turnOffActives}
