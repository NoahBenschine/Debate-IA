const {Pool} = require("pg");
const date = require("./date.js");
const prisma = require("./prismaClient");

const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

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
