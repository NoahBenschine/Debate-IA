import React, { useState,useEffect} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import { useSession } from "next-auth/react";

export default function EndVoting(props){
  const {data:session} = useSession();
const [usersClicked,setUsersClicked] = useState([])
  const [name, setName] = useState("");

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "usersClicked") {
      setUsersClicked((prevState)=>[...prevState,newValue]);
      if(props.activeUsers){

    }
  };
console.log(usersClicked);
console.log(props.active_users);
  if(usersClicked.length >= props.activeUsers.length){
     console.log("Enough People");
     console.log(props.winFunction);
    props.winFunction();
    localStorage.clear();
      localStorage.getItem("usersClicked")
   }
}

  useEffect(() => {
    console.log("useEffect went off")
    localStorage.getItem("usersClicked")&&setUsersClicked(localStorage.getItem("usersClicked").split(","));
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
    console.log(props.activeUsers);

    const pushval = []
    console.log(localStorage.getItem("usersClicked"));
    if (localStorage.getItem("usersClicked")=="" || localStorage.getItem("usersClicked")==null){
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
