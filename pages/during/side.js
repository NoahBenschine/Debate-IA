import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Transcript.module.css";
import {signIn, signOut,getSession, useSession} from "next-auth/react";
export default function Side(props){

  const { data: session } = useSession()
 console.log(session);
    const fetchtest = async () => {
      const response = fetch("/api/test")
      const data = await response
      console.log(data);
    }
  const postData =  async() => {
      console.log(props.session);
       console.log(session);
    const response = await fetch("/api/databaseCalls/extraSignIn",{
        method:"POST",

        body:JSON.stringify({side:props.side,user:session.user.name}),
      });
      return response.json();
}
  return(
    <div className={styles.list_container}>
    <ul className={styles.list}>
    <li>Test</li>
    <li>Test2</li>
    <li>Test3</li>
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
// export async function postData(url,sending){
//   console.log("It's getting lcicked")
// const response = await fetch(url,{
//     method:"POST",
//
//     body:JSON.stringify(sending),
//   });
//
//  return response.json();
// }
function GetTest(){

  // fetch('http://localhost:3000/api/databaseCalls/test.js')
  //   .then(response => response.json())
  //   .then(data => console.log(data));

}
 // () => postData("http://localhost:3000/api/databaseCalls/extraSignIn.js",props.side)
