import { MongoClient } from "mongodb"

// const uri = process.env.MONGODB_URI
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }
//
// let client
// let clientPromise
//
// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local")
// }
//
// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
//
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }
//
// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.


let clientPromise
const uri = "mongodb+srv://admin-noah:1KHCmKN2hx23eQ2l@cluster0.zhxis.mongodb.net/debateDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
clientPromise = client.connect();
console.log(clientPromise);
export default clientPromise
