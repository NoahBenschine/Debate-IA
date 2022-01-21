import React from "react"
import styles from "../../styles/Vote.module.css";
export default function MostVotes(props){


return(
   <div className={styles.mostVoteContainer}>
    <h2 className={styles.values}>Our Next Debate is: {props.voteName}</h2>
    <p className={styles.values}>It won with: {props.numVotes}</p>
   </div>
  )
}
