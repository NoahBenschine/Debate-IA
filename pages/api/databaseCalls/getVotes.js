import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function VoteHandler(req,res){

  const db = await dbConnect(); // retrieve db instance


const Vote = mongoose.models.Vote ||mongoose.model('Vote', newVoteSchema);

findAll();

function findAll(){
 Vote.find({},function (err, votes){
  if(err){
    console.log(err+"There was an error in voteclicked");
  }else{
    if(votes){
        console.log("this should go last")
        res.send({votes:votes})
    }
  }

})
}

}
