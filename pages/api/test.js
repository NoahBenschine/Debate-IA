import { useSession, signIn, signOut,getSession, SessionProvider} from "next-auth/react";
test();
export default function test(req, res) {
signIn("google");
  res.status(200).json({ name: 'John Doe' })
  console.log(res);
}
