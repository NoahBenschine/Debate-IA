import React from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import Vote from "./vote.js"
import MostVotes from "./MostVotes"
import styles from "../../styles/Vote.module.css";
export default function Main(){
  return(
    <div className={styles.container}>
    <Head>
    <title>Voting</title>
    <meta name="viewport" content="initial-scale=1, width=device-width"  />
    <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
     integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
     crossorigin="anonymous"
    />
    </Head>

  <Container fluid>
  <Row>
  <Col lg={2}>  <Vote /></Col>
  <Col lg={6}>  </Col>

  <Col  className={styles.mostVotCol} lg={4}>
   <MostVotes />
    </Col>

  </Row>


  </Container>
   </div>
  )
}
