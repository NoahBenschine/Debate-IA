// import NextAuth from "next-auth"
// import Providers from "next-auth/providers"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
// import Adapters from "next-auth/adapters";
// import User, { UserSchema } from "../../../models/User";
// import DBADD from "./users/index.js";
// console.log(prisma);
export default async function auth(req, res){
  return await NextAuth(req, res, {
 adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}),
    ],

    secret:"The dragon soars high into the sky",
    // adapter: MongoDBAdapter({
    //   db: (await clientPromise).db("debateUserDB")
    // }),
    session: {
        // Seconds - How long until an idle session expires and is no longer valid.
         maxAge: 60*60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
      },


        // other options (pages, callbacks, session, ...etc)
  })
}
