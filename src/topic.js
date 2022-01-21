import prisma from "./prismaClient"

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

async function turnOffTopic(name){
  const deactivated_topic = await prisma.topic.update({
    where:{
      name:name
    },
    data:{
      active:false
    }
  })
  return deactivated_topic;
}


 async function topicUpsert(name,owner_id,active_type){
  const topic_object = await prisma.topic.upsert({
    where:{
      name: name,
    },
    update: {
      active:active_type
    },
    create: {
      name: name,
      owner_id: owner_id,
      active: active_type
    },
  })
  return topic_object;
}



 async function deleteTopic(name){
  const topic = await prisma.topic.deleteMany({
    where: {
      name: name,
    },
  })
}

export {getAllTopics,getTopicName, getTopic,topicUpsert,deleteTopic,getAllActiveTopics, turnOffActives, turnOffTopic}
