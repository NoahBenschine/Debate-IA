import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"
import styles from "../../styles/Topic.module.css";
import useSWR from 'swr'
import React, { useState,useEffect } from "react"
import Link from "next/link"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getSession, useSession } from "next-auth/react";
import TopicElement from "./TopicElement.js";

function useTopics(id) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/db/Calls/${id}`, fetcher)

  return {
    topics: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function Main() {
  const [inputState, setInputState] = useState("");
  const [topicState, setTopicState] = useState([]);
  const [chosenTopics, setChosenTopics] = useState([]);
  const { data: session } = useSession();


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
    present && setChosenTopics(previousArr => [...previousArr, < TopicElement key={previousArr.length} click = { deleteTopic } topic = { topic_name }
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
    names.forEach((element) => {
      if(element!= ""){
                active_topics.push( < TopicElement click = { deleteTopic } topic = {element}  />)
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

    <Container fluid>
    <Row className={styles.rowvote}>

    <Col>
    <Autocomplete
    disablePortal
    freeSolo
    onInputChange={(event,value) =>{setInputState(value)}}
    options={topicState}
    getOptionLabel={topicState => topicState.name}
    id="combo-box-demo"
    sx={{ width: 300 }}
    renderInput={(params) => (<TextField {...params} name="Topic" />)}
    />
    <Button onClick={()=>(topicClick(inputState))}>Choose Topic</Button>
    </Col>
    <Col>
    {chosenTopics}
    </Col>
    </Row>
    <Row className={styles.rowvoteelements}>
    <Col>     <Link href="/voting/main" passHref><Button className={styles.voteButton} size="lg">Vote!</Button></Link> </Col>

    </Row>

    </Container>
    </div>
  )
}
