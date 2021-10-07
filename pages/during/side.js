import React from "react"
import { Button} from 'react-bootstrap';
import styles from "../../styles/Transcript.module.css";

export default function Side(props){
  return(
    <div className={styles.list_container}>
    <ul className={styles.list}>
    <li>Test</li>
    <li>Test2</li>
    <li>Test3</li>
    </ul>
    
    <Button className={styles.joinbutton} size="lg">Join {props.side}</Button>
    </div>
  )

}
