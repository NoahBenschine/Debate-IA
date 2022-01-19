import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import styles from "../../styles/Topic.module.css";
import useSWR from 'swr'
import React,{useState} from "react"
import Link from "next/link"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {getSession, useSession}  from "next-auth/react";
import VoteElement from "./voteelement.js";

export default function Main(){
const [inputState,setInputState] = useState("");
  const [topicState,setTopicState] = useState([]);
  const [chosenTopics,setChosenTopics] = useState([]);
  const {data:session} = useSession();
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  function getTopics(id) {
    const { data, error } = useSWR(`/api/Calls/${id}`, fetcher)

    return {
      topics: data,
      isLoading: !error && !data,
      isError: error
    }
  }
    const response = getTopics("topicHandler");
    if (response.topics != undefined && topicState.length == 0) {
         setTopicState(Object.values(response.topics));
         console.log(topicState);
    }

    function createTopic(topic_name){
    var present = true;
    chosenTopics.forEach((element)=>{
      console.log(element);
      if (element.props != undefined && element.props.topic == topic_name){
    present = false;
      }
    })
     present&&setChosenTopics(previousArr => [...previousArr, <VoteElement topic={topic_name}/>]);
    }

async function topicClick(name){
  const response = await fetch("/api/Calls/topicHandler",{
    method:"POST",
    body:JSON.stringify({topic_name:name,user: session.user.name}),
  })
  const agreement = response.text();
  agreement.then((result) =>{
        console.log(result);
      createTopic(name)

  })
}

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
  <Autocomplete
    disablePortal
    freeSolo
    onInputChange={(event,value) =>{setInputState(value)}}
    options={topicState}
    getOptionLabel={topicState => topicState.name}
    id="combo-box-demo"
    sx={{ width: 300 }}
    renderInput={(params) => (<TextField {...params} name="Topic" />)}
  />
<Button onClick={()=>(topicClick(inputState))}>Choose Topic</Button>
   </Col>
  <Col>
{chosenTopics}
  </Col>
  </Row>
<Row className={styles.rowvoteelements}>
  <Col>     <Link href="/voting/main" passHref><Button className={styles.voteButton} size="lg">Vote!</Button></Link> </Col>

</Row>

  </Container>
   </div>
  )
}
