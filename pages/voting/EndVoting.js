import React, { useState,useEffect} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import { useSession } from "next-auth/react";

export default function EndVoting(){
  const {data:session} = useSession();
const [usersClicked,setUsersClicked] = useState([])
  const [name, setName] = useState("");

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "usersClicked") {
      setUsersClicked((prevState)=>[...prevState,newValue]);
    }
  };


  useEffect(() => {
    console.log("useEffect went off")
    setUsersClicked(localStorage.getItem("usersClicked").split(","));
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
  if (!present){
    const pushval = []
    if ( localStorage.getItem("usersClicked")==""|| null){
      pushval.push(session.user.name)
    }else{
      pushval.push(...localStorage.getItem("usersClicked").split(","),session.user.name)
    }
    arr.push(...pushval)
    setUsersClicked((prevState)=>[...prevState,session.user.name])
    localStorage.setItem("usersClicked",arr)
    }
}
  return(
    <Button onClick={handleClick}>End Voting Test</Button>
  );
}
