import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import Vote from "./vote.js"
import VoteElement from "./voteelement.js"
import MostVotes from "./MostVotes"
import styles from "../../styles/Vote.module.css";
export default function Main(){
const [voteState,setVoteState] = useState([]);
const [mostVotes,setMostVotes] = useState({
  username:"",
  nameVote:"",
  voteNum:0,
});

function updateMostVoted(voteobject){

    console.log("Update is wokring"+voteobject);
    setMostVotes(voteobject);
  }
function checkState(){
  return (mostVotes.voteNum)
}

  function createVotes(votes){
console.log(votes);
console.log(checkState());
console.log(mostVotes.voteNum)
  const voteArray=[]
  votes.forEach((element, index)=>{
    voteArray.push(<VoteElement key={index} update={(object)=>{updateMostVoted(object)}} checkState={()=>{return (mostVotes.voteNum)}} topic={element.voteName}/>)
  })
  console.log(voteArray);
  setVoteState(voteArray);
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

  <Col> <Vote updateVotes={createVotes}/></Col>
  <Col></Col>
  <Col> <MostVotes name={mostVotes.username} voteName={ mostVotes.nameVote} numVotes={mostVotes.voteNum}/> </Col>

  </Row>
<Row className={styles.rowvoteelements}>
  <Col>  <div>{voteState}</div> </Col>

</Row>

  </Container>
   </div>
  )
}
