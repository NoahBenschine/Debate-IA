import {topicUpsert} from "/src/topic.js"
import {adminInsert,getAllAdmins} from "/src/admin.js"
import {getUserId} from "/src/user.js"
import {changeCurrentDebate,deleteAllDebates,getAllDebates} from "/src/debate.js"
export default async function adminHandler(req,res){
const body = JSON.parse(req.body);
console.log(req.headers);
console.log(req.body);
if(req.headers.adminmethod == "changeDebate"){
  // deleteAllDebates();
console.log(body.topic_name);
await changeCurrentDebate(body.topic_name);
   console.log(await getAllDebates());
res.send("topic updated");
}else if(req.headers.adminmethod == "addAdmin"){
  const user_id = await getUserId(body.name);
 if(user_id) {
   console.log(user_id);
 await adminInsert(user_id);
  res.send("Admin Added")
}else{
  res.send("User does not exist");
}
}else if(req.headers.adminmethod == "changeDebateTime"){

}else{
  res.send("something's wrong")
}


}
