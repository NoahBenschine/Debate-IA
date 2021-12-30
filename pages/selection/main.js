import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import styles from "../../styles/Topic.module.css";
import useSWR from 'swr'
import TopicList from "./topiclist.js"
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
     crossOrigin="anonymous"
    />
    </Head>

  <Container fluid>
  <Row className={styles.rowvote}>

  <Col>
  <TopicList/>
   </Col>
  <Col></Col>


  </Row>
<Row className={styles.rowvoteelements}>
  <Col>   </Col>

</Row>

  </Container>
   </div>
  )
}
