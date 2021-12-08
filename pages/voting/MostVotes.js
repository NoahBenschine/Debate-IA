import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Vote.module.css";
import useSWR from 'swr'
import $ from "jquery";
export default function MostVotes(props){
  const [mostVotes,setMostVotes] = useState({
    username:"",
    nameVote:"",
    numVotes:0,
  });
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  function useUser() {
    const { data, error } = useSWR('/api/databaseCalls/getVotes', fetcher,{ refreshInterval: 1000 } )

      return {
        user: data,
        isLoading: !error && !data,
        isError: error

      }
  }
  const {user,isLoading,isError} = useUser();
 const newV = update();
  function update(){
    console.log(user);
    if (user){
      return updateMostVoted();
    }
  }

  function updateMostVoted(){
    let voteE = {}
     for(let x of user.votes){
// Update delay in value in database, update delay in ability of this button to retreive it
       //somewhat substantial delay somewhere that needs to be fixed but other wise works decently, button needs to be switched out.
        if (x.numVotes > voteE.numVotes || $.isEmptyObject(voteE)){
          voteE = x;
        }
     }
     if (voteE){
       return voteE;;
     }
    }


async function decideWinner(){
    if(newV){
    const response = await fetch("/api/databaseCalls/nextTopic",{
      method:"POST",
      body:JSON.stringify({name:newV.voteName,description:newV.voteDesc})
    })
    }
  }
return(
   <div className={styles.mostVoteContainer}>
     <Button  onClick={decideWinner} className={styles.vote} size="lg"></Button>
    <h2 className={styles.values}>Most Votes: {props.voteName}</h2>
    <p className={styles.values}>{newV&&newV.numVotes}</p>
    <p className={styles.values}>{props.name}</p>
   </div>
  )
}
