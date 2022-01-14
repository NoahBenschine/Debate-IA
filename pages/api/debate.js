const {Pool} = require("pg");
const getDate = require("./date.js");
const prisma = require("./prismaClient");


let currentD = "";


const date = getDate();
var fnName = async function() {
    // main code

}

if (typeof require !== 'undefined' && require.main === module) {
   fnName();
  //console.log(currentD);
}

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
// function debateInsert(name){
//     console.log("THIS is the current date"+date);
//   const text = 'INSERT INTO debate(topic_name,date) VALUES($1,$2) RETURNING *'
//   const values = [name,date]
//   pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }

module.exports = {
  getDebate: getDebate,
  debateInsert: debateInsert
}
