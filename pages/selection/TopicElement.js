import React from "react"
import { Button} from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSession}  from "next-auth/react";
import styles from "../../styles/Topic.module.css";
export default function TopicElement(props){

const {data:session} = useSession();


return(
  <div class={styles.TopicElement}>
  <p>{props.topic}</p>

  <Fab class={styles.deleteElement} onClick={()=>props.click(props.topic)} size="small" color="secondary" aria-label="add">
  <DeleteIcon />
</Fab>
  </div>
)
}
