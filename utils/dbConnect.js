import mongoose from "mongoose";

async function dbConnect() {
  const url = "mongodb+srv://admin-noah:"+process.env.MONGODB_PASSWORD+"@cluster0.zhxis.mongodb.net/debateDB?retryWrites=true&w=majority"
  console.log(process.env.MONGODB_PASSWORD)
  console.log(url)
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return mongoose.connection.db;
  }


  return mongoose.connect(url, {

  });
}

export default dbConnect;
