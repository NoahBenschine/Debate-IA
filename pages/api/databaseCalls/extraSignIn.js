import dbConnect from "../../../utils/dbConnect";

import mongoose from "mongoose";

export default async function SideHandler(req,res){
  const userinfoSchema = new mongoose.Schema({
    name:String,
    side:String
  })
  console.log("Under this is the post request:");
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
  UserInfo.find({},function (err, sides){
    if(err){
      console.log(err+"There was an error");
    }else{
      if(sides){
          res.send({sides:sides})

      }
    }

  })
      // on retrieval of the users collection run any desired query methods to the collection
      // sidesCollection.find({}).toArray((err, sides) => {

      // respond with users as json


      // })
    // );
  }else{
    console.log("Error, Wrong method bro");
  }

}
