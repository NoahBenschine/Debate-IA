
const date = require("./date.js");
const prisma = require("./prismaClient");
const debate = require("./debate.js");
const user = require("./user.js");
const Topic = require("./topic.js");


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


async function getVotesByTopic(topic_id){
 const votes = await prisma.vote.findMany({
     where: {
       topic_id:topic_id
     },
   })
   return votes;
}
async function getVotesByDebate(debate_id){
 const votes = await prisma.vote.findMany({
     where: {
       debate_id:debate_id
     },
   })
   return votes;
}
async function getVoteByUser(user_id){
 const votes = await prisma.vote.findMany({
     where: {
       owner_id:user_id
     },
   })
   return votes;
}
async function getVoteIdByUD(user_id,debate_id){
  const vote = await prisma.vote.findMany({
      where: {
        owner_id:user_id,
        debate_id:debate_id
      },
    })

    return vote.id;
}

async function findOrUpdate(user_id,topic_id,debate_id,vote_id){
   const upsertVote = await prisma.vote.upsert({
     where: {
       id:vote_id
     },
     update: {
       topic_id: topic_id,
     },
     create: {
       owner_id: user_id,
       topic_id: topic_id,
       debate_id: debate_id
     },
   })
  return upsertVote;
}

async function changeVote(user_id,topic_id){
  const updateVote = await prisma.vote.update({
  where: {
     owner_id:user_id,
  },
  data: {
    topic_id:topic_id,
  },
})
}


async function voteInsert(topic_id,user_id,debate_id){
  const vote_object = await prisma.vote.create({
    data: {
      topic_id: topic_id,
      owner_id: user_id,
      debate_id: debate_id
    },
  })
}

export {getVoteByUser,getVoteIdByUD,getVotesByTopic,getVotesByDebate,voteInsert,changeVote,findOrUpdate}
