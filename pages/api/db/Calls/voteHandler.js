const  {getCurrentDebate,debateInsert,getDebateByTopic_Name,changeFutureDebate} = require("/src/debate.js");
const {getUserId,getAllUserIds} = require("/src/user.js");
const {getVoteByUser, getVoteIdByUD,getVotesByTopic,getVotesByDebate,voteInsert,changeVote,findOrUpdate,deleteAllVotes} = require("/src/vote.js")
const {getAllTopics,getTopic,getTopicName, turnOffActives} = require("/src/topic.js")
import {getDate} from "/src/date.js"
export default async function voteHandler(req,res){

  const voteList = {}

  const debate = await getDebate();
  const debate_id = debate.id
  if (req.headers.votemethod =="CreateVote"){
    const body = JSON.parse(req.body);

    const topic_id = await getTopic(body.voteName);
    const user_id = await getUserId(body.user);
    var vote_id = await getVoteIdByUD(user_id,debate_id)
    const vote_userid = await getVoteByUser(user_id);
    if (!vote_id){vote_id= -1}
    const result = await findOrUpdate(user_id,topic_id,debate_id,vote_id)
    res.send(result);
  }else if(req.headers.votemethod=="selectWinner"){
    const currentVotes = await getVotesByDebate(debate_id)
//error is happening when no votes have happened
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
    const debate_id = await getDebateByTopic_Name("ToBeChanged");
    changeFutureDebate(debate_id,topic_name,getDate());
    console.log(winningTopic+"This is winning otpic");
    console.log(topics);

    const test = await turnOffActives(parseInt(winningTopic))
    deleteAllVotes();
    res.send({name:topic_name,numVotes:Math.max(...valArr)});
  }
}
