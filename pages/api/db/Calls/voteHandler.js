const  {getCurrentDebate,debateInsert,getDebateByTopic_Name,changeFutureDebate} = require("/src/debate.js");
const {getUserId,getAllUserIds} = require("/src/user.js");
const {getVoteByUser, getVoteIdByUD,getVotesByTopic,getVotesByDebate,voteInsert,changeVote,findOrUpdate,deleteAllVotes} = require("/src/vote.js")
const {getAllTopics,getTopic,getTopicName, turnOffActives} = require("/src/topic.js")
import {getDate} from "/src/date.js"
export default async function voteHandler(req,res){

  const voteList = {}

  const debate = await getCurrentDebate();
  const debate_id = debate.id;
  if (req.headers.votemethod =="CreateVote"){
    const body = JSON.parse(req.body);

    const topic = await getTopic(body.voteName);
    const user_id = await getUserId(body.user);
    var vote_id = await getVoteIdByUD(user_id,debate_id)
    const vote_userid = await getVoteByUser(user_id);
    if (!vote_id){vote_id= -1}
    const result = await findOrUpdate(user_id,topic.id,debate_id,vote_id)
    res.send(result);
  }else if(req.headers.votemethod=="selectWinner"){
    const currentVotes = await getVotesByDebate(debate_id);
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
    if (winningTopic){
      const topic_name = await getTopicName(parseInt(winningTopic));
      const topics = await getAllTopics();
      const debate_newid = await getDebateByTopic_Name("ToBeChanged");
      await changeFutureDebate(debate_newid,topic_name,getDate());
      const test = await turnOffActives(parseInt(winningTopic))
      console.log("we won");
          res.send({name:topic_name,numVotes:Math.max(...valArr)});
    }else{
      res.send({err:"not enough votes"})
    }



    // deleteAllVotes();

  }
}
