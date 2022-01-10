
const date = require("./date.js");
const prisma = require("./prismaClient");


var fnName = async function() {
    console.log(await getAllUserIds());
}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}

async function getUserId(user_name){
 const user = await prisma.users.findFirst({
     where: {
       name: user_name
     },
   })
   return user.id;
}

async function getAllUserIds(user_name){
 const user = await prisma.users.findMany({
   })
   return user.id;
}
function getAccount(){
  const text = 'SELECT * from Account'
  const values = []
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}
function getSession(){
  const text = 'SELECT * from Session'
  const values = []
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

module.exports = getUserId;
