import Head from "next/head";
import Image from "next/image";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useSession, signIn, signOut,getSession, SessionProvider} from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function HomeScreen(props){
  console.log(process.env.NEXTAUTH_URL+"/choosing/main");\
    console.log(process.env.NEXTAUTH_URL.toString()+"/choosing/main");
      console.log(typeof process.env.NEXTAUTH_URL+"/choosing/main");
  return(
    <div className={styles.container}>
<Head>
<title>Create Next App</title>
<meta name="description" content="Generated by create next app" />
<link
 rel="stylesheet"
 href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
 integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
  crossOrigin="anonymous"
/>
</Head>

<Container className={styles.container} fluid>

  {/* Stack the columns on mobile by making one full-width and the other half-width */}
  <Row>

    <Col lg={6}>
    <main className={styles.main}>
    <h2>Debate Club</h2>
    <h1 className={styles.TimeandDate}>Next Debate: Friday at 11:00</h1>
    <button className={styles.signin} onClick={() => {
       console.log(process.env.NEXTAUTH_URL)
          console.log(process.env.NEXTAUTH_URL.toString());
      signIn("google",{ callbackUrl: process.env.NEXTAUTH_URL.toString()+"/choosing/main"})} }>Go to Google</button>
    </main>
    </Col>

  </Row>

  {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}

</Container>
</div>
  )

}
