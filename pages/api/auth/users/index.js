// import dbConnect from "../../../utils/dbConnect";
//
// export default async (req, res) => {
//   const db = await dbConnect(); // retrieve db instance
//
//   // you can also use switch/case on req.method for a clean structure
//   if (req.method === "GET") {
//   	// query db for users collection
//     db.collection("users", (err, usersCollection) =>
//
//       // on retrieval of the users collection run any desired query methods to the collection
//       usersCollection.find({}).toArray((err, users) => {
//
//       // respond with users as json
//         res.status(200).json(users);
//
//       })
//     );
//   }
// // };
// import dbConnect from "../../../utils/dbConnect";
//
// export default function dbAdd(){
//   const db = dbConnect(); // retrieve db instance
//
//   // you can also use switch/case on req.method for a clean structure
//
//   	// query db for users collection
//     db.collection("users", (err, usersCollection) =>
// 
//       // on retrieval of the users collection run any desired query methods to the collection
//       usersCollection.find({}).toArray((err, users) => {
//
//       // respond with users as json
//         res.status(200).json(users);
//
//       })
//     );
// }
