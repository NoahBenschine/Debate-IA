import mongoose from "mongoose";

async function dbConnect() {
  const url = process.env.MONGODB_URI

  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return mongoose.connection.db;
  }


  return mongoose.connect(url, {

  });
}

export default dbConnect;
