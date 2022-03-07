import {topicUpsert} from "/src/topic.js"
import {adminInsert,getAllAdmins} from "/src/admin.js"
import {getUserId,getAllUserIds} from "/src/user.js"
import {changeCurrentDebate,deleteAllDebates,getAllDebates,debateInsert,getCurrentDebate} from "/src/debate.js"
import {getDate} from "/src/date.js"
export default async function adminHandler(req,res){
  if (req.method == "GET" && req.headers.adminmethod != "searchForDebate"){
    console.log(await getAllAdmins());
    res.send(await getAllAdmins());
  }else if(req.method == "GET" && req.headers.adminmethod == "searchForDebate"){
    const debates = await getAllDebates();
    // debates.forEach((element,index)=>{
    //   debates[index].date = element.date.toDateString();
    // })
    // console.log(debates);
    res.send(debates);
  }else{
const body = JSON.parse(req.body);
console.log(req.headers);
console.log(req.body);
if(req.headers.adminmethod == "changeDebate"){
  // deleteAllDebates();
const user_id = await getUserId(body.user);
console.log(user_id);
await topicUpsert(body.topic_name,user_id,true);
await changeCurrentDebate(body.topic_name);
res.send("topic updated");
}else if(req.headers.adminmethod == "addAdmin"){
  const user_id = await getUserId(body.name);
 if(user_id) {
 await adminInsert(user_id);
  res.send("Admin Added")
}else{
  res.send("User does not exist");
}
}else if(req.headers.adminmethod == "changeDebateTime"){
  const date = new Date(body.time);
 debateInsert("ToBeChanged",date);
console.log(await getAllDebates());
res.send("debate has been added")
}else if(req.headers.adminmethod == "getPresentUsers"){
  console.log(typeof body.date);
  const date = new Date(body.date);
  console.log(date);
  const debate = await getCurrentDebate(date)
  res.send(debate.present_users);
}else{
  res.send("something's wrong")
}

}
}
// else if(req.headers.adminmethod == "getUsers"){
//   const users = await getAllUsers();
//   res.send(users);
// }
