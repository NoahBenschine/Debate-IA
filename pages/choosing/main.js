import React,{useState,useEffect} from "react"

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Head from "next/head"
import Link from "next/link"
import Side from "./side.js"
import styles from "../../styles/Side.module.css";
import {getSession, useSession } from "next-auth/react";
import useSWR from 'swr'


export default function Main(props){

  const [sides, setSides] = useState();
  const [pro, setPro] = useState([]);
  const [con, setCon] = useState([]);
  const { data: session,status } = useSession();

// const response = useTopics("SideChoosing");
let admin = false;
if(session!= null){
  props.data.forEach((element) =>{
    if (element.user.name == session.user.name){
      admin =true;
    }
  })
}



console.log(props);
// console.log(response);
// console.log(response.session);

console.log(session);
const onStorageUpdate = (e) => {
  const { key, newValue } = e;
  if(key ==="Sides"){
    console.log(newValue);
    const pros = []
    const cons = []
      const sides = JSON.parse(newValue);
    sides.forEach(function(element,index) {
        if (element.side == "Pro") {
          pros.push(element)
        } else {
          cons.push(element)
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
  if(sides != null && sides[0] != ""){
    sides.forEach(function(element,index) {
        if (element.side == "Pro") {

          pros.push(element)
        } else {
          cons.push(element)
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

function renderProSides({ index, isScrolling, key, style }) {
      return (
        <div key={key} style={style}>
          <div>{pro[index].user.name}</div>
        </div>
      );
}
function renderConSides({ index, isScrolling, key, style }) {
      return (
        <div key={key} style={style}>
          <div>{con[index].user.name}</div>
        </div>
      );
}


  function createLi(sides) {
    console.log(localStorage);

    console.log(sides);
    const pros = []
    const cons = []
    sides.forEach(function(element,index) {
        if (element.side == "Pro") {
          // pros.push(<li key={index}>{element.user.name}</li>)
          pros.push(element)
        } else {
          // cons.push(<li key={index} >{element.user.name}</li>)
          cons.push(element)

          // <ListItem  key={index} component="div" disablePadding>
          //     <ListItemText primary={element.user.name} />
          // </ListItem>


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
  <link rel="stylesheet" href="https://debate-ia-dev.vercel.app/_next/static/css/0f7b27d7c1c35c94468a.css"  type = "text/css" />
    </Head>
    <Grid container direction="row" sx={{height:1}} spacing={2}>
      <Grid container direction="row" item sx={{width:.5,justifyContent: 'center'}}xs={6}>

        {admin&& <Link href="/admin/ControlPanel" passHref><Button className={styles.adminButton} variant="contained" size="lg">Admin Panel</Button></Link>}
      <Side elements={pro}  create={createLi} side="Pro"/>
      </Grid>
      <Grid item  container direction="row" sx={{width:.5,justifyContent: 'center' }}xs={6}>
          <Side elements={con} create={createLi} side="Con"/>
        <Link href="/selection/main" passHref><Button className={styles.topicButton} variant="contained"  size="lg">Choose Topic!</Button></Link>
      </Grid>
    </Grid>

   </div>
  )
}
export async function getServerSideProps(context) {
    const res = await fetch(process.env.NEXTAUTH_URL+"/api/db/Calls/adminHandler", {
      method: "GET",
    })
  const data = await res.json()
  console.log(data);
  const admins = {};

  return { props: {data} }

}
