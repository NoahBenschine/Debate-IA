import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import useSWR from 'swr'
import $ from "jquery";
export default function MostVotes(props){


return(
   <div className={styles.mostVoteContainer}>
    <h2 className={styles.values}>Our Next Debate is: {props.voteName}</h2>
    <p className={styles.values}>It won with: {props.numVotes}</p>
   </div>
  )
}
