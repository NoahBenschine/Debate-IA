import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Transcript.module.css";
import {signIn, signOut,getSession, useSession} from "next-auth/react";
export default function Side(props){
const [sides, setSides] = useState();


  const { data: session } = useSession()
 // console.log(session);
    const fetchtest = async () => {
      const response = fetch("/api/test")
      const data = await response
      // console.log(data);
    }
    function createLi(){
       const names= []
       sides.forEach(function(element){
     if (element.side == props.side){
       names.push(<li>{element.owner_id}</li>)
    }

    })
    return names;
    }
  const postData =  async() => {
      // console.log(props.session);
      //  console.log(session);
    const response = await fetch("/api/Calls/SideChoosing",{
        method:"POST",

        body:JSON.stringify({side:props.side,user:session.user.name}),
      });
  const sideObject = response.json();

  sideObject.then(function(resu){
    console.log(resu);
         setSides(resu);
       });
       console.log(session);
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
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
