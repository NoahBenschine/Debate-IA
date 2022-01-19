import React,{useState} from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Transcript.module.css";
import {signIn, signOut,getSession, useSession} from "next-auth/react";
export default function Side(props){
const [sides, setSides] = useState();
const [pro, setPro] = useState();
const [con, setCon] = useState();
  const { data: session } = useSession()
    const fetchtest = async () => {
      const response = fetch("/api/test")
      const data = await response
    }
    console.log(pro);
        console.log(con);
    function createLi(sides){
       const pros= []
       const cons = []
       sides.forEach(function(element){
     if (element.side == props.side){
       if (element.side == "Pro"){
         pros.push(<li>{element.user.name}</li>)
       }else{
        cons.push(<li>{element.user.name}</li>)
       }
    }
    })

    setPro(pros);
    setCon(cons);

    }
  const postData =  async() => {
    const response = await fetch("/api/db/Calls/SideChoosing",{
        method:"POST",
        body:JSON.stringify({side:props.side,user:session.user.name}),
      });
  const sideObject = response.json();

  sideObject.then(function(resu){
    createLi(resu);
       });
}

  return(
    <div className={styles.list_container}>
    <ul className={styles.list}>
   {props.side=="Pro"?pro:con}
    </ul>
    <Button onClick={postData} className={styles.joinbutton} size="lg">Join {props.side}</Button>
    </div>
  )

}
