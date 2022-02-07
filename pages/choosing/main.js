import React,{useState,useEffect} from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import Link from "next/link"
import Side from "./side.js"
import styles from "../../styles/Transcript.module.css";
import {getSession, useSession } from "next-auth/react";
import useSWR from 'swr'

function useTopics(id) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/db/Calls/${id}`, fetcher,10000)
 // const sideElements = checkTable(data);
  return {
    sides: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default function Main(){

  const [sides, setSides] = useState();
  const [pro, setPro] = useState([]);
  const [con, setCon] = useState([]);
  const { data: session,status } = useSession();

const response = useTopics("SideChoosing");






const onStorageUpdate = (e) => {
  const { key, newValue } = e;
  console.log(e);
  console.log(key+"this is the key")
  if(key ==="Sides"){
    console.log(newValue);
    const pros = []
    const cons = []
      const sides = JSON.parse(newValue);
    sides.forEach(function(element) {
        if (element.side == "Pro") {
          pros.push(<li>{element.user.name}</li>)
        } else {
          cons.push(<li>{element.user.name}</li>)
        }
    })
    setPro(pros);
    setCon(cons);
  }
}



useEffect(() => {
  const pros = []
  const cons = []
  const sides = JSON.parse(localStorage.getItem("Sides"));
  console.log(sides);
  if(sides[0] != ""){
    sides.forEach(function(element) {
        if (element.side == "Pro") {
          pros.push(<li>{element.user.name}</li>)
        } else {
          cons.push(<li>{element.user.name}</li>)
        }
    })
    setPro(pros);
    setCon(cons);
  }
  window.addEventListener("storage", onStorageUpdate);
  return () => {
    window.removeEventListener("storage", onStorageUpdate);
  };
}, []);



  function createLi(sides) {
    console.log(sides);
    const pros = []
    const cons = []
    sides.forEach(function(element) {
        if (element.side == "Pro") {
          pros.push(<li>{element.user.name}</li>)
        } else {
          cons.push(<li>{element.user.name}</li>)
        }
    })
    localStorage.setItem("Sides",JSON.stringify(sides));
    setPro(pros);
    setCon(cons);

  }
  return(
     <div className={styles.container}>
    <Head>
    <title>Create Next App</title>
    <meta name="description" content="Generated by create next app" />
    <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
     integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
      crossOrigin="anonymous"
    />
    </Head>

  <Container fluid>
   <Row>
   <Col className={styles.Col} lg={6}>
     <Side elements={pro} create={createLi} side="Pro"/>
   </Col>
   <Col className={styles.Col} lg={6}>
   <Side elements={con}  create={createLi} side="Con"/>
   <Link href="/selection/main" passHref><Button className={styles.voteButton} size="lg">Choose Topic!</Button></Link>
   </Col>
   </Row>
  </Container>
   </div>
  )
}

// function checkTable(sides){
//   const pros = []
//   const cons = []
//   if(sides){
//     sides.forEach(function(element) {
//         if (element.side == "Pro") {
//           pros.push(<li>{element.user.name}</li>)
//         } else {
//           cons.push(<li>{element.user.name}</li>)
//         }
//     })
//   }
//
//   return {pro:pros,con:cons}
// }
