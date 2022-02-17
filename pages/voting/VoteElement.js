import React,{useState}from "react"
import Button from '@mui/material/Button';
import Head from "next/head"
import {getSession, useSession}  from "next-auth/react";
import styles from "../../styles/Vote.module.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function VoteElement(props){
const [userClicks,setUserClicks] = useState([])
const {data:session} = useSession();
 async function voteClick(){
   let present = false;
   userClicks.forEach((element)=>{
     if (element == session.user.name){
       present = true;
     }
   })
   if (present!=true){
     const response = await fetch("/api/db/Calls/voteHandler",{
       method:"POST",
       body:JSON.stringify({voteName:props.topic,user: session.user.name}),
       headers:{voteMethod:"CreateVote"}
     })
     const agreement = response.json();
     agreement.then((result) =>{
       console.log(result);
       setUserClicks((prevState)=>[...prevState,session.user.name])
     })
   }
 }

return(

  <div className={styles.VoteElement}>
  <p>{props.topic}</p>

  <Button  onClick={voteClick} size="small" color="secondary" aria-label="add">
  <ThumbUpIcon  />
</Button>
</div>
)
}
