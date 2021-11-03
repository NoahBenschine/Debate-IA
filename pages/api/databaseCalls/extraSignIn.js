import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function SideHandler(req,res){
  const userinfoSchema = new mongoose.Schema({
    name:String,
    side:String
  })
  console.log("Under this is the post request:");
    console.log("And this is the body:"+req.body.side);
  const db = await dbConnect(); // retrieve db instance


const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', userinfoSchema);

  if(req.method === "POST"){
var body = JSON.parse(req.body);
console.log("the actual user:" +body.user+"and the actual body:"+body);
  var new_info = new UserInfo({
      name:body.user,
      side:body.side
  });
  new_info.save(function(err){
    if(err) console.log(err);
  });
      // on retrieval of the users collection run any desired query methods to the collection
      // sidesCollection.find({}).toArray((err, sides) => {

      // respond with users as json
  res.status(200).json({sides:"none"});

      // })
    // );
  }else{
    console.log("Error, Wrong method bro");
  }

}
