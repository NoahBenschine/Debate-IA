import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "/src/prismaClient"
import {getAdminByUser,adminInsert} from "/src/admin.js"

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
         maxAge: 60*60, // 30 days
<<<<<<< HEAD
         strategy:"jwt"
=======
>>>>>>> dev
        // Seconds - Throttle how frequently to write to database to extend a session
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
      },
      callbacks: {
<<<<<<< HEAD
        async session({ session, user, token }) {
          console.log("session was called");
          console.log(session);
          console.log(user);
          console.log(token);
      return session
    },
        async signIn({ user, account, profile, email, credentials }) {
  console.log("signIn was called");


          const admin = await getAdminByUser(user.id);
          console.log(admin);
          if(admin == null && email == "tgetman@pvcsd.org"){
            adminInsert(user.id);
              return "/admin/ControlPanel";
          }else if(admin != null){
              return "/admin/ControlPanel";
          }else{
            return "/choosing/main";
          }
        },
=======
        // async signIn({ user, account, profile, email, credentials }) {
        //
        //
        //
        //   const admin = await getAdminByUser(user.id);
        //   console.log(admin);
        //   if(admin == null && email == "tgetman@pvcsd.org"){
        //     adminInsert(user.id);
        //       return "/admin/ControlPanel";
        //   }else if(admin != null){
        //       return "/admin/ControlPanel";
        //   }else{
        //     return "/choosing/main";
        //   }
        // },
>>>>>>> dev

    async jwt({ token, account }) {
      console.log("jwt was called")
  // Persist the OAuth access_token to the token right after signin
  if (account) {
    token.accessToken = account.access_token
  }
  return token
}

}
        // other options (pages, callbacks, session, ...etc)
  })
}
