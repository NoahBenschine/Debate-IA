import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import {getSession, useSession}  from "next-auth/react";
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useFormControl } from '@mui/material/FormControl';
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
     result.then(function(resu){
            console.log(resu);
            props.updateVotes(resu.votes);
          });

    }
  return(


   <div >
   <TextField
     id="filled-multiline-flexible"
     name="Topic"
     placeholder="Topic Name"
     color="secondary"
     fullWidth
     required
     value={textState.topic}
     onChange={updateText}
   />
   <TextField
     id="filled-multiline-static"
     required
     name="Description"
     color="secondary"
     sx={{
      color: 'success.main',
    }}
     label="Multiline"
     variant="filled"
     fullWidth
     multiline
     maxRows={4}
     value={textState.description}
     onChange={updateText}
   />
        <Fab onClick={newVote} className={styles.voteButton}><AddIcon /></Fab>


   </div>
  )
}
