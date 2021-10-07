import React,{useState} from "react"
import styles from "../../styles/Vote.module.css";

export default function MostVotes(){
  const [mostVotes, setMostVotes] = useState({});

  return(
   <div className={styles.mostVoteContainer}>
    <h2>Most Votes: Topic 6</h2>
    <p> Noah Benschine</p>
   </div>
  )
}
