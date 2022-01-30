
const getDate = require("./date.js");
import prisma from "./prismaClient"

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
     topic_name:topic_name
   }
    })
  return currentDebate;
}
 async function getDebate(){
  const currentDebate = await prisma.debate.findFirst({
      where: {
        date: date
      },
    })
    return currentDebate;
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

async function debateInsert(name){
  const debate_object = await prisma.debate.create({
    data: {
      topic_name: name,
      date: date,
    },
  })
}

export  {getDebate,debateInsert,getAllDebates,changeCurrentDebate,deleteAllDebates}
