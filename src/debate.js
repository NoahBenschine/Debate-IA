const {Pool} = require("pg");
const getDate = require("./date.js");
const prisma = require("./prismaClient");

const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });
let currentD = "";


const date = getDate();
var fnName = async function() {
    // main code
    console.log(await getDebate())
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

// function getCurrentDebate(){
//   const text = 'SELECT * from debate WHERE date = $1 '
//   const values = [date()]
//
// var val = pool.query(text,values, (err, res) => {
// // console.log(err, res)
// pool.end()
// return res;
// })
// console.log(val)
// return val;
// }


function debateInsert(name){
  const text = 'INSERT INTO debate(topic_name,date) VALUES($1,$2) RETURNING *'
  const values = [name,date()]
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

module.exports = getDebate;
