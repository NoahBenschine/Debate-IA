import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Transcript.module.css";
import {signIn, signOut,getSession, useSession} from "next-auth/react";
export default function Side(props){
const [sides, setSides] = useState();

  const { data: session } = useSession()
    const fetchtest = async () => {
      const response = fetch("/api/test")
      const data = await response
    }
    function createLi(){
       const names= []
       sides.forEach(function(element){
     if (element.side == props.side){
       names.push(<li>{element.user.name}</li>)
    }

    })
    return names;
    }
  const postData =  async() => {
    const response = await fetch("/api/Calls/SideChoosing",{
        method:"POST",
        body:JSON.stringify({side:props.side,user:session.user.name}),
      });
  const sideObject = response.json();

  sideObject.then(function(resu){
    console.log(resu);
         setSides(resu);
       });
}

  return(
    <div className={styles.list_container}>
    <ul className={styles.list}>
   {sides &&createLi()}
    </ul>
    <Button onClick={postData} className={styles.joinbutton} size="lg">Join {props.side}</Button>
    </div>
  )

}
