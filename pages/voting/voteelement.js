import React,{useState}from "react"
import { Button} from 'react-bootstrap';
import Head from "next/head"
import updateMostVoted from "./MostVotes.js"
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
   console.log("click went off");
   const response = await fetch("/api/databaseCalls/voteClicked",{
     method:"POST",
     body:JSON.stringify({voteName:props.topic,user: session.user.name})
   })
   const agreement = response.json();
   agreement.then(async (result) =>{
     // console.log(result);
     //    console.log(mostVotes.voteNum);
     const newVotes = result.votes;
     calculateVotes();
     // console.log(newVotes);
     function callback(_callback){
newVotes.forEach((element) =>{
       if(element.numVotes > mostVotes.voteNum){
         console.log("is this getting to work")
         const voteobject = {username:element.name,
            nameVote:element.voteName,
            voteNum:element.numVotes}
         setMostVotes(voteobject)

       }
       console.log(mostVotes.voteNum);
       console.log(element)
  });

  _callback();
}
function calculateVotes(){
  callback(()=>{
    console.log("I don't know what I'm doing")
    if (props.topic === mostVotes.nameVote){
      props.update({
        username:mostVotes.username,
        nameVote:mostVotes.nameVote,
        voteNum:mostVotes.voteNum

  })
  }
  })
}




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
