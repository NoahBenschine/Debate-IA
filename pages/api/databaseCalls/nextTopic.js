import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function TopicHandler(req,res){

  const newTopicSchema = new mongoose.Schema({
    topicName:String,
    topicDesc:String,
  })
  console.log("Under this is the post request:");
  const db = await dbConnect(); // retrieve db instance
delete mongoose.connection.models["Topic"];

const Topic = mongoose.models.Topic ||mongoose.model('Topic', newTopicSchema);

  if(req.method === "POST"){
var body = JSON.parse(req.body);
console.log(body);
console.log(body.description);
// console.log("the actual user:" +body.user+"and the actual body:"+body);
  var new_topic = new Topic({
      topicName:body.name,
      topicDesc:body.description,
  });
//find is going earlier than save.
new_topic.save(function(err){
    if(err) console.log(err+"This is the error");
  })
  }else{
    console.log("Error, Wrong method bro");
  }

}
