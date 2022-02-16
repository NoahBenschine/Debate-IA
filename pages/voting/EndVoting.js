import React, { useState,useEffect} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import { useSession } from "next-auth/react";
import useSWR from 'swr';

function useDB(id, token) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR([`/api/db/Calls/${id}`, token], fetcher)

  return {
    response: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default function EndVoting(props){
  const {data:session} = useSession();
const [usersClicked,setUsersClicked] = useState([])
  const [name, setName] = useState("");
  const { response, isLoading, isError } = useDB("topicHandler", { headers: { deeperMethod: "voteRequest" } });
  console.log(response);
  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "usersClicked") {
      setUsersClicked((prevState)=>[...prevState,newValue]);
  };
}

  useEffect(() => {
    console.log("useEffect went off")
    localStorage.getItem("usersClicked")&&setUsersClicked(localStorage.getItem("usersClicked").split(","));
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);
useEffect(()=>{
  if(usersClicked.length >= response&&response.active_users.length){
    console.log(usersClicked.length);
    console.log(response);
    console.log(response.active_users.length)
     console.log("Enough People");
     console.log(props.winFunction);
     setUsersClicked([]);
    props.winFunction();
    localStorage.clear();
      localStorage.getItem("usersClicked")
   }
},[usersClicked,response&&response.active_users.length])

function handleClick(){
  const arr = [];
  let present = false;
  usersClicked.forEach((element)=>{
    if (element ==session.user.name){
      present = true;
    }
  })
  console.log(present);
  console.log(usersClicked)
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
    <Button className={styles.createTopic} wonClick={handleClick}>End Voting Test</Button>
  );
}
