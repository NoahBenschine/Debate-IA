const date = require("../date.js");
const prisma = require("../prismaClient");
const debate = require("../debate.js");
const user = require("../user.js");
const {getVoteByUser, getVoteIdByUD,getVotesByTopic,getVotesByDebate,voteInsert,changeVote,findOrUpdate} = require("../vote.js")
const {getAllTopics,getTopic,getTopicName, turnOffActives} = require("../topic.js")

export default async function voteHandler(req,res){

      const voteList = {}
  const debate_id = await debate.getDebate();
  if (req.headers.votemethod =="CreateVote"){
    const body = JSON.parse(req.body);

    const topic_id = await getTopic(body.voteName);
    const user_id = await user(body.user);
 var vote_id = await getVoteIdByUD(user_id,debate_id)
 const vote_userid = await getVoteByUser(user_id);
if (!vote_id){vote_id= -1}
    const result = await findOrUpdate(user_id,topic_id,debate_id,vote_id)
  res.send(result);
}else if(req.headers.votemethod=="selectWinner"){
const currentVotes = await getVotesByDebate(debate_id)

currentVotes.forEach((element,index)=>{
  const id = element.topic_id
if (voteList.hasOwnProperty(id)){
  voteList[id] += 1
}else{
  voteList[id] = 1;
}

})
const valArr = Object.values(voteList);
const keyArr = Object.keys(voteList)
const winningTopic = keyArr[valArr.indexOf(Math.max(...valArr))]
const topic_name = await getTopicName(parseInt(winningTopic));
const topics = await getAllTopics();

const test = await turnOffActives(parseInt(winningTopic))
res.send({name:topic_name,numVotes:Math.max(...valArr)});
}
}
