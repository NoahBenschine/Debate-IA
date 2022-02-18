
import Head from "next/head"
import styles from "../../styles/Topic.module.css";
import useSWR from 'swr'
import React, { useState,useEffect } from "react"
import Link from "next/link"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getSession, useSession } from "next-auth/react";
import TopicElement from "./TopicElement.js";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
function useTopics(id) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/db/Calls/${id}`, fetcher)

  return {
    topics: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function Main(props) {
  const [inputState, setInputState] = useState("");
  const [topicState, setTopicState] = useState([]);
  const [chosenTopics, setChosenTopics] = useState([]);
  const { data: session } = useSession();

  let admin = false;
  if(session!= null){
    props.data.forEach((element) =>{
      if (element.user.name == session.user.name){
        admin =true;
      }
    })
  }


console.log(session);
  const response = useTopics("topicHandler");
  if (response.topics != undefined && topicState.length == 0) {
    setTopicState(Object.values(response.topics));
    console.log(topicState);
  }

  function createTopic(topic_name) {
    var present = true;
    chosenTopics.forEach((element) => {
      console.log(element);
      if (element.props != undefined && element.props.topic == topic_name) {
        present = false;
      }
    })
    present && setChosenTopics(previousArr => [...previousArr, < TopicElement key={previousArr.length+1} click = { deleteTopic } topic = { topic_name }
          />]);
          const pushval = [];
          if(localStorage.getItem("Active_Topics") !="" && localStorage.getItem("Active_Topics") !=null && present){
            pushval.push(localStorage.getItem("Active_Topics").split(","),topic_name)
          }else if(present){
              pushval.push(topic_name)
          }
          localStorage.setItem("Active_Topics",pushval);
        }

        async function topicClick(name) {
          if (name != "") {
            const response = await fetch("/api/db/Calls/topicHandler", {
              method: "POST",
              body: JSON.stringify({ topic_name: name, user: session.user.name }),
            })
            const agreement = response.text();
            agreement.then((result) => {
              console.log(result);
              createTopic(name)
              console.log(localStorage.getItem("Active_Topics"));
            })
          } else {
            alert("Entry cannot be left empty")
          }
        }
        async function deleteTopic(topic_name) {
            const response = await fetch("/api/db/Calls/topicHandler", {
              method: "POST",
              body: JSON.stringify({ topic_name: topic_name, user: session.user.name }),
              headers: { deeperMethod: "ActiveOff" }
            })
            const agreement = response.json();
            agreement.then((result) => {
                console.log(result);
                const active_topics = [];
                const active_names = [];
                result.forEach((element) => {
                    active_topics.push( < TopicElement click = { deleteTopic } topic = { element.name }

                      />)
                  active_names.push(element.name);
                    })
                    localStorage.setItem("Active_Topics",active_names);
                    setChosenTopics(active_topics);
                })
            }

function localUpdate(names){
  const active_topics = [];
  console.log(typeof names);
  if(typeof names != "string" ){
    console.log(names);
    names.forEach((element,index) => {
      if(element!= ""){
        console.log(index);
                active_topics.push( < TopicElement key={index} click = { deleteTopic } topic = {element}  />)
}
          setChosenTopics(active_topics);
        });
  }

    }




            const onStorageUpdate = (e) => {
              const { key, newValue} = e;
              console.log(key);
              if(key ==="Active_Topics" ){
                console.log(newValue);
                    localUpdate(newValue.split(','));
              }
            }



            useEffect(() => {
            let names = "";
            if(localStorage.getItem("Active_Topics")){
              names=localStorage.getItem("Active_Topics").split(",")
            }
            if(typeof names != "string"){
              localUpdate(names);
            }

              window.addEventListener("storage", onStorageUpdate);
              return () => {
                window.removeEventListener("storage", onStorageUpdate);
              };
            }, []);





  return(
  <div className={styles.container}>
    <Head>
    <title>Voting</title>
    <meta name="viewport" content="initial-scale=1, width=device-width"  />
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossOrigin="anonymous"
    />
    </Head>

    <Grid container sx={{height:1}} spacing={2}>
      <Grid item  sx={{height:.4,}}xs={12}>
        <Autocomplete
        className={styles.Autocomplete}
        disablePortal
        freeSolo
        onInputChange={(event,value) =>{setInputState(value)}}
        options={topicState}
        getOptionLabel={topicState => topicState.name}
        id="combo-box-demo"
        sx={{ width: 300 ,

        }}
        renderInput={(params) => (<TextField {...params} name="Topic" />)}
        />
        <Button className={styles.createTopic} variant="contained" onClick={()=>(topicClick(inputState))}>Choose Topic</Button>

    <Link  href="/voting/main" passHref><Button className={styles.voteButton} sx={{
      fontFamily: "Helvetica",
       fontSize: 24,
       fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#f5ba13"

     }} variant="contained"size="lg">Vote!</Button></Link>
      {admin&& <Link href="/admin/ControlPanel" passHref><Button  size="lg">Admin Panel</Button></Link>}
      </Grid>
      <Grid item  sx={{height:.6}}xs={12}>
      <div className={styles.topicContainer}>
    {chosenTopics}
    </div>
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
  return { props: {data} }

}
