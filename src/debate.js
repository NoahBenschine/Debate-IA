
import {getDate} from "./date.js"
import prisma from "./prismaClient";

let currentD = "";


const date = getDate();

async function changeCurrentDebate(topic_name){
  const currentDebate = await prisma.debate.upsert({
      where: {
        date: date
      },
      update:{
     topic_name:topic_name
   },
   create:{
     date:date,
     topic_name:topic_name,
   }
    })
  return currentDebate;
}
async function addUserToDebate(username,date){
  const currentDebate = await prisma.debate.update({
      where: {
        date: date
      },
      data:{
       present_users:{
         push: username,
       },
      },
  })
  console.log(currentDebate)
  return currentDebate;
}
async function changeFutureDebate(id,topic_name,new_date){
  const futureDebate = await prisma.debate.upsert({
      where: {
        id:id
      },
      update:{
     topic_name:topic_name
   },
   create:{
     date:new_date,
   }
    })
  return futureDebate;
}

 async function getCurrentDebate(date_input){
  const currentDebate = await prisma.debate.findFirst({
      where: {
        date: date_input
      },
    })
    return currentDebate;
}

async function getDebateByTopic_Name(topic_name){
 const debate = await prisma.debate.findFirst({
     where: {
       topic_name: topic_name
     },
   })
   return debate;
}

async function getAllDebates(){
 const currentDebate = await prisma.debate.findMany({

   })
   return currentDebate;
}

async function deleteAllDebates(){
 const currentDebate = await prisma.debate.deleteMany({

   })
   return currentDebate;
}

async function debateInsert(name,new_date){
  const debate_object = await prisma.debate.create({
    data: {
      topic_name: name,
      date: new_date,
    },
  })
}

export  {getCurrentDebate,debateInsert,getAllDebates,changeCurrentDebate,deleteAllDebates,changeFutureDebate,getDebateByTopic_Name, addUserToDebate}
