const {Pool} = require("pg");
const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

var fnName = async function() {
    // main code
    deleteTopic("Death Penalty");
}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}


async function getTopic(name){
 const topic = await prisma.topic.findFirst({
     where: {
       name:name
     },
   })
   return topic.id;
}

// function getTopic(name){
// const text = 'SELECT * from topic WHERE name = $1 '
// const values = [name]
// pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }

 async function topicInsert(name,owner_id){
  const topic_object = await prisma.topic.create({
    data: {
      name: name,
      owner_id: owner_id,
    },
  })
}
// function topicInsert(name,owner_id){
//   const text = 'INSERT INTO topic(name,owner_id) VALUES($1,$2) RETURNING *'
//   const values = [name,owner_id]
//   pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }
 async function deleteTopic(name){
  const topic = await prisma.topic.deleteMany({
    where: {
      name: name,
    },
  })
}

// function deleteTopic(name){
//   const text = 'DELETE FROM topic where name = [$1] RETURNING *'
//   const values = [name]
//   pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }


module.exports = {
    getTopic: getTopic,
    topicInsert: topicInsert,
    deleteTopic: deleteTopic
};
