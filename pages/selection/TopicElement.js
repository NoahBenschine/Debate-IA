import React from "react"
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSession}  from "next-auth/react";
import styles from "../../styles/Topic.module.css";
export default function TopicElement(props){

const {data:session} = useSession();


return(
  <div className={styles.TopicElement}>
  <p>{props.topic}</p>

  <Button  onClick={()=>props.click(props.topic)} size="small" color="secondary" aria-label="add">
  <DeleteIcon />
</Button>
  </div>
)
}
