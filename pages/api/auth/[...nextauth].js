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
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "./lib/mongodb"

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}),
    ],
    adapter: MongoDBAdapter({
      db: (await clientPromise).db("debateUserDB")
    }),

  })
}
