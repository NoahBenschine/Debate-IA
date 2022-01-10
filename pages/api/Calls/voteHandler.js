const date = require("../date.js");
const prisma = require("../prismaClient");
const debate = require("../debate.js");
const user = require("../user.js");
const {getVoteByUser,getVotesByTopic,voteInsert,changeVote,findOrUpdate} = require("../vote.js")
const {getAllTopics,getTopic} = require("../topic.js")

export default async function voteHandler(req,res){
  const body = JSON.parse(req.body);
  const topic_id = getTopic(body.voteName);
  const user_id = user(body.user);
  console.log(user_id+"This is topic id"+topic_id);
  debate.debateInsert(body.voteName);
  const debate_id = debate.getDebate();
  const result = await findOrUpdate(user_id,topic_id,debate_id)
console.log(result);
res.send(result);
}
