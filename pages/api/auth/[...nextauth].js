import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "/src/prismaClient"
import {getAdminByUser,adminInsert,deleteAllAdmins, getAllAdmins} from "/src/admin.js"
import {getAllSessions} from "/src/user.js"
import {addUserToDebate,getAllDebates,getCurrentDebate} from "/src/debate.js"
import {getDate} from "/src/date.js"
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
    session: {
        // Seconds - How long until an idle session expires and is no longer valid.
         maxAge: 60*60, // 30
            strategy:"database"
        // Seconds - Throttle how frequently to write to database to extend a session
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
      },
      callbacks: {

        async signIn({ user, account, profile, email, credentials }) {
         // await deleteAllAdmins();
         // console.log(await  getAllAdmins());
        console.log(getAllDebates);
        const debate = await getCurrentDebate(getDate());
        console.log(debate);
        if (debate != null){
          if(debate.present_users != null){
            if (debate.present_users.indexOf(user.name) == -1){
                   await addUserToDebate(user.name,getDate());
            }
          }


        }
         return true;
        }


}
        // other options (pages, callbacks, session, ...etc)
  })
}
