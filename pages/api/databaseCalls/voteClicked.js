import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function VoteHandler(req,res){


  console.log("Under this is the post request for voite:");
  const db = await dbConnect(); // retrieve db instance


const Vote = mongoose.models.Vote;

  if(req.method === "POST"){
var body = JSON.parse(req.body);
console.log("voteclicked user:" +body.user+" voteclicked body:"+body);
Vote.updateOne({name:body.user,voteName:body.voteName},
    {$inc:{numVotes:1}}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }
});
// Vote.updateOne({name:body.user,voteName:body.voteName},{$inc:{numVotes:1},function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Updated Docs : ", docs);
//     }
// }
//   })


 Vote.find({},function (err, votes){
  if(err){
    console.log(err+"There was an error in voteclicked");
  }else{
    if(votes){

        res.send({votes:votes})

    }
  }

})
      // on retrieval of the users collection run any desired query methods to the collection
      // sidesCollection.find({}).toArray((err, sides) => {

      // respond with users as json
      // Vote.find({name:body.user,voteName:body.voteName},function (err, votes){
      //   if(err){
      //     console.log(err+"There was an error");
      //   }else{
      //     if(votes){
      //       console.log(votes);
      //         res.send({votes:votes})
      //
      //     }
      //   }
      //
      // })

      // })
    // );
  }else{
    console.log("Error, Wrong method bro");
  }

}
