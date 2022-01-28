import React, { useState,useEffect} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import { useSession } from "next-auth/react";

export default function EndVoting(){
  const {data:session} = useSession();
const [numVotes,setNumVotes] = useState(0)
const [usersClicked,setUsersClicked] = useState([])
  const [name, setName] = useState("");

  console.log( usersClicked)
  console.log(typeof usersClicked)
  console.log(usersClicked[0])
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    console.log(key);
    console.log(newValue);
    if (key === "usersClicked") {
      setUsersClicked((prevState)=>[...prevState,newValue]);
    }
  };


  useEffect(() => {
    setUsersClicked(localStorage.getItem("usersClicked").split(",") || []);
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);


function handleClick(){
  const arr = [];
  let present = false;
  usersClicked.forEach((element)=>{
    if (element ==session.user.name){
      present = true;
    }
  })
  if (!present)
    arr.push(localStorage.getItem("usersClicked"),session.user.name)
    setUsersClicked((prevState)=>[...prevState,session.user.name])
    setNumVotes((prevState)=>prevState+=1);
    localStorage.setItem("usersClicked",arr)

console.log(numVotes);
console.log(usersClicked);
}
  return(
    <Button onClick={handleClick}>End Voting Test</Button>
  );
}
