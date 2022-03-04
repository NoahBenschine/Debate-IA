import {changeCurrentDebate,deleteAllDebates,getAllDebates,debateInsert} from "/src/debate.js"

export default async function debateHanlder(req,res){
  if (req.method == "GET"){
   const debate_list =  await getAllDebates()
   const last_debate = debate_list[debate_list.length-1];
   console.log(last_debate);
   res.send({date:last_debate.date.toDateString(),topic_name:last_debate.topic_name});
  }
}
