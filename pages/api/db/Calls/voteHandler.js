import  {getCurrentDebate,debateInsert,getAllDebates,getDebateByTopic_Name,changeFutureDebate} from "/src/debate.js";
import {getUserId,getAllUserIds} from "/src/user.js";
import {getVoteByUser, getVoteIdByUD,getVotesByTopic,getVotesByDebate,voteInsert,changeVote,findOrUpdate,deleteAllVotes} from "/src/vote.js";
import {getAllTopics,getTopic,getTopicName,getAllActiveTopics, turnOffAllActives} from "/src/topic.js";
import {getDate,nextDebate} from "/src/date.js"
export default async function voteHandler(req,res){

  const voteList = {}

  const debate = await getCurrentDebate(getDate());
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

      const debate_new = await getDebateByTopic_Name("ToBeChanged");
      console.log(await getAllDebates());
      debate_new?await changeFutureDebate(debate_new.id,topic_name,nextDebate()):await debateInsert(topic_name,nextDebate());
      console.log("divider between the debates");
      console.log(await getAllDebates());
      await turnOffAllActives();
      const active_topics = await getAllActiveTopics();
          res.send({name:topic_name,numVotes:Math.max(...valArr),active_topics:active_topics});
    }else{
      res.send({err:"not enough votes"})
    }



    // deleteAllVotes();

  }
}
