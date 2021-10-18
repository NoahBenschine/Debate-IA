import React,{useState} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import styles from "../../styles/Vote.module.css";

export default function Vote(){
    const [votingState,setVotingState] = useState(false);


    function changeVotingState(){
      setVotingState(true);
    }
  return(
   <div className={styles.voteContainer}>
    <form className={styles.create_vote}>
     <input  type="text" placeholder="Topic name"></input>
       <textarea onClick={changeVotingState} placeholder="Topic Description"  rows="6"/>
       <Fab className={styles.voteButton}><AddIcon /></Fab>

    </form>

   </div>
  )
}
