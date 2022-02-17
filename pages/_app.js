import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react";
function MyApp
({
  Component,
  pageProps: {session, ...pageProps },
}) {
  console.log(pageProps);
return (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);
}

export default MyApp


export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/db/Calls/adminHandler", {
      method: "GET",
    })
  const data = await res.json()
  console.log(data);
  return { props: {data} }

}
