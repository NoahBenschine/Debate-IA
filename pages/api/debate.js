
const getDate = require("./date.js");
const prisma = require("./prismaClient");


let currentD = "";


const date = getDate();


 async function getDebate(){
  const currentDebate = await prisma.debate.findFirst({
      where: {
        date: date
      },
    })
    return currentDebate.id;
}
async function getAllDebates(){
 const currentDebate = await prisma.debate.findMany({

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

module.exports = {
  getDebate: getDebate,
  debateInsert: debateInsert
}
