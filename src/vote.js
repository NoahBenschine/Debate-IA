const prisma = require("./prismaClient");
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


async function deleteAllVotes(){
 const votes = await prisma.vote.deleteMany({

 })
}



export {getVoteByUser,getVoteIdByUD,getVotesByTopic,getVotesByDebate,deleteAllVotes,findOrUpdate}
