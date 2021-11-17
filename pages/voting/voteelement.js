import React from "react"
import { Button} from 'react-bootstrap';
import Head from "next/head"
import {getSession, useSession}  from "next-auth/react";
import styles from "../../styles/Vote.module.css";
export default function VoteElement(props){
const {data:session} = useSession();
 async function voteClick(){
   console.log("click went off");
   const response = await fetch("/api/databaseCalls/voteClicked",{
     method:"POST",
     body:JSON.stringify({voteName:props.topic,user: session.user.name})
   })
   const agreement = response.json();
   agreement.then((result) =>{
     console.log(result);
   })
 }

return(
  <div >

  <Button  onClick={voteClick} className={styles.vote} size="lg">{props.topic}</Button>
  </div>
)
}