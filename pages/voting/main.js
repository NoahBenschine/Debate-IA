import React, { useState } from "react"
import Head from "next/head";
import VoteElement from "./VoteElement.js";
import MostVotes from "./MostVotes";
import Link from "next/link"
import TextField from '@mui/material/TextField';
import styles from "../../styles/Vote.module.css";
import useSWR from 'swr'
import EndVoting from "./EndVoting.js"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSession } from "next-auth/react";
function useDB(id, token) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR([`/api/db/Calls/${id}`, token], fetcher)

  return {
    response: data,
    isLoading: !error && !data,
    isError: error
  }
}
export default function Main(props) {
  const [voteState, setVoteState] = useState([]);
  const [winDisplay, setWinDisplay] = useState();
  const { data: session,status } = useSession();
  const { response, isLoading, isError } = useDB("topicHandler", { headers: { deeperMethod: "voteRequest" } });
  console.log(response);
  console.log(voteState);
  if (response != undefined && voteState.length == 0) {
    createVotes(response.active_topics);
  }
  let admin = false;
  if(session!= null){
    props.data.forEach((element) =>{
      if (element.user.name == session.user.name){
        admin =true;
      }
    })
  }

  function createVotes(topics) {
    const voteArray = []
    topics.forEach((element, index) => {
        voteArray.push( < VoteElement key = { index } topic = { element.name }
          />)
        })
        setVoteState(voteArray);
    }

    async function voteWinner() {
        const response = await fetch("/api/db/Calls/voteHandler", {
          method: "GET",
          headers: { voteMethod: "selectWinner" }
        })
        const agreement = response.json();
        agreement.then((result) => {

            setWinDisplay( < MostVotes voteName = { result.name } numVotes = { result.numVotes }
              />)
              console.log(result)
            })
        }
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
    {winDisplay?winDisplay:<EndVoting winFunction={voteWinner}  activeUsers={response&&response.active_users}/>}
  {admin&& <Link href="/admin/ControlPanel" passHref><Button  size="lg">Admin Panel</Button></Link>}
    </Grid>
    <Grid item  sx={{height:.6}}xs={12}>
    <div className={styles.voteContainer}>
{voteState}
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
