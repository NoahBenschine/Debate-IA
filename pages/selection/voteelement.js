import React,{useState, useEffect}from "react"
import { Button} from 'react-bootstrap';
import Head from "next/head"
import {getSession, useSession}  from "next-auth/react";
import styles from "../../styles/Vote.module.css";
export default function VoteElement(props){

     const [mostVotes,setMostVotes] = useState({
       username:"",
       nameVote:"",
       voteNum:0,
     });

const {data:session} = useSession();
 async function voteClick(){
     console.log(mostVotes.voteNum);
   console.log("click went off");
   const response = await fetch("/api/Calls/voteHandler",{
     method:"POST",
     body:JSON.stringify({voteName:props.topic,user: session.user.name}),
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
export async function getServerSideProps(context) {
  return {
    props: {
      //I think this is the kee to having one state for mostVotes, experiment
    },
  }



}


// (prevState) =>({
//   ...prevState,
//   username:element.name,
//  nameVote:element.voteName,
//  voteNum:element.numVotes
// })
