import React, { useState } from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import { useSession } from "next-auth/react";

export default function EndVoting(){
  const {data:session} = useSession();
const [numVotes,setNumVotes] = useState(0)
const [usersClicked,setUsersClicked] = useState([])
function getAllUsers(){

}

function handleClick(){
  let present = false;
  usersClicked.forEach((element)=>{
    if (element ==session.user.name){
      present = true;
    }
  })
  if (!present){
    setUsersClicked((prevState)=>[...prevState,session.user.name])
    setNumVotes((prevState)=>prevState+=1);
  }
console.log(numVotes);
console.log(usersClicked);
}
  return(
    <Button onClick={handleClick}>End Voting </Button>
  )
}
