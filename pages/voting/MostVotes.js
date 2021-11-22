import React,{useState} from "react"
import styles from "../../styles/Vote.module.css";

export default function MostVotes(props){
  const [mostVotes,setMostVotes] = useState({
    username:"",
    nameVote:"",
    voteNum:0,
  });
return(
   <div className={styles.mostVoteContainer}>
    <h2 className={styles.values}>Most Votes: {props.voteName}</h2>
    <p className={styles.values}>{props.numVotes}</p>
    <p className={styles.values}>{props.name}</p>
   </div>
  )
}
