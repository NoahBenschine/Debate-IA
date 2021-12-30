const {Pool} = require("pg");
const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const Topic = require("./topic.js");

const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

var fnName = async function() {
  const user_id = await user();
  const debate_id = await debate.getDebate();
  const topic = await Topic.getTopic("prisons");
  console.log(await getVote(topic.id));
  // voteInsert(topic.id,user_id,debate_id);
}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}


async function getVote(topic_id){
 const votes = await prisma.vote.findMany({
     where: {
       topic_id:topic_id
     },
   })
   return votes;
}
async function changeVote(topic_id,user_id){
  const updateVote = await prisma.vote.update({
  where: {
     user_id:user_id,
  },
  data: {
    topic_id:topic_id,
  },
})
}
// function changeVote(topic_id){
//   const text = 'UPDATE vote SET topic_id = $1 WHERE user_id = $2 RETURNING *'
//   const values = [topic_id,user_id]
//   pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }

async function voteInsert(topic_id,user_id,debate_id){
  const vote_object = await prisma.vote.create({
    data: {
      topic_id: topic_id,
      owner_id: user_id,
      debate_id: debate_id
    },
  })
}
// function voteInsert(topic_id,user_id,debate_id){
//   const text = 'INSERT INTO vote(topic_id,owner_id,debate_id) VALUES($1,$2,$3) RETURNING *'
//   const values = [topic_id,user_id,debate_id]
//   pool.query(text,values, (err, res) => {
// console.log(err, res)
// pool.end()
// })
// }

module.exports = {
  getVote: getVote,
  voteInsert: voteInsert,
  changeVote: changeVote
}
