import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head";
import VoteElement from "./voteElement.js";
import MostVotes from "./MostVotes";
import TextField from '@mui/material/TextField';
import styles from "../../styles/Vote.module.css";
import useSWR from 'swr'
export default function Main(){
const [voteState,setVoteState] = useState([]);
const [winDisplay,setWinDisplay] = useState();
const fetcher = (...args) => fetch(...args).then(res => res.json())
function connectDB(id,token) {
    const { data, error } = useSWR([`/api/db/Calls/${id}`,token], fetcher)

    return {
      response: data,
      isLoading: !error && !data,
      isError: error
    }
}
  const {response,isLoading,isError} = connectDB("topicHandler",{headers:{deeperMethod:"voteRequest"}});
  console.log(response);
  if (response != undefined && voteState.length == 0){
    createVotes(response);
  }
  function createVotes(topics){
      const voteArray=[]
  topics.forEach((element, index)=>{
    voteArray.push(<VoteElement key={index} topic={element.name}/>)
  })
  setVoteState(voteArray);
  }

  async function voteWinner(){
    const response = await fetch("/api/db/Calls/voteHandler",{
      method:"GET",
      headers:{voteMethod:"selectWinner"}
    })
    const agreement = response.json();
    agreement.then((result) =>{

      setWinDisplay(<MostVotes voteName={result.name} numVotes={result.numVotes}/>)
      console.log(result)
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
  <Col><Button onClick={voteWinner}>Choose Winner</Button></Col>
  <Col></Col>
  <Col>{winDisplay} </Col>

  </Row>
<Row className={styles.rowvoteelements}>
  <Col>  <div>{voteState}</div> </Col>

</Row>

  </Container>
   </div>
  )
}
