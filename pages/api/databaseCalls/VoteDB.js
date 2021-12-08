import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function VoteHandler(req,res){

  const newVoteSchema = new mongoose.Schema({
    name:String,
    voteName:String,
    voteDesc:String,
    numVotes:Number
  })
  console.log("Under this is the post request:");
  const db = await dbConnect(); // retrieve db instance


const Vote = mongoose.models.Vote ||mongoose.model('Vote', newVoteSchema);
console.log(Vote);
  if(req.method === "POST"){
var body = JSON.parse(req.body);
// console.log("the actual user:" +body.user+"and the actual body:"+body);
  var new_vote = new Vote({
      name:body.user,
      voteName:body.topic,
      voteDesc:body.description,
      numVotes:0
  });
//find is going earlier than save.
new_vote.save(function(err){
  console.log("what is going first");
    findAll();
    if(err) console.log(err+"This is the error");

  })
function findAll(){
  Vote.find({},function (err, votes){
     if(err){
       console.log(err+"There was an error");
     }else{
       if(votes){
         // console.log(votes+"These are the votes");
           res.send({votes:votes})

       }
     }

   })
}



  }else{
    console.log("Error, Wrong method bro");
  }

}
