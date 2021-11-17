import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import {getSession, useSession}  from "next-auth/react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import styles from "../../styles/Vote.module.css";

export default function Vote(props){
      const { data: session } = useSession()
    const [votingState,setVotingState] = useState(false);
    const [textState,setTextState] = useState({
      topic:"",
      description:"",
    })
    function updateText(event){
      const val = event.target.value;
    event.target.name==="Topic"
    ?setTextState({topic:val,description:textState.description})
    :setTextState({topic:textState.topic,description:val});
    }
    function changeVotingState(){
      setVotingState(true);
    }
    async function newVote(){
      console.log("Fab click worked")
     const response = await fetch("/api/databaseCalls/VoteDB",{
       method:"POST",

       body:JSON.stringify({topic:textState.topic,description:textState.description,user:session.user.name})
     })

     const result = response.json();
     console.log(result);
     result.then(function(resu){
            console.log(resu);
            props.updateVotes(resu.votes);
          });

    }
  return(
   <div className={styles.voteContainer}>
    <form className={styles.create_vote}>
     <input  name="Topic"onChange={updateText}type="text" placeholder="Topic name"></input>
       <textarea name="Description" onChange={updateText} onClick={changeVotingState} placeholder="Topic Description"  rows="6"/>
       <Fab onClick={newVote} className={styles.voteButton}><AddIcon /></Fab>

    </form>

   </div>
  )
}
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   }
// }
