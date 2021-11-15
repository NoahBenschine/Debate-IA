import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Dimensions from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useSession, signIn, signOut } from "next-auth/client"
import {useRouter} from "next/router"
import styles from "../styles/Home.module.css";
// import Date from "../api/date.js";
export default function HomeScreen(){
  const [session] = useSession()
 const router = useRouter()


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
    <h2> Debate Club</h2>
    <h1 className={styles.TimeandDate}>Next Debate: Friday at 11:00</h1>
    <button className={styles.signin} onClick={() => signIn("google",{ callbackUrl: 'debate-ia.vercel.app' })}>Go to Google</button>
    {session && (
           <div>
             <p>Signed in as {session.user.email}</p>
             <p>Name {session.user.name}</p>
             <img src={session.user.image} alt={session.user.name} />
           </div>
         )}
    </main>
    </Col>
    <Col  lg={6}>
    <div     style={{
        position: "relative",
        width: "50vw",
        height: "100vw",
        maxHeight: "100vh",
        objectFit: "contain",
        maxWidth: "50vw",
      }}>
      <Image src="/../public/image-deb.jpg"
      alt="Couldn't find this image sry"
       width={100}
       height={100}


       />
      </div>
    </Col>
  </Row>

  {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}

</Container>
</div>
  )

}
