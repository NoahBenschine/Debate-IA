import React from "react"
import { Button} from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useSession}  from "next-auth/react";
import styles from "../../styles/Vote.module.css";
export default function TopicElement(props){

const {data:session} = useSession();


return(
  <div>
  <p>{props.topic}</p>

  <Fab onClick={()=>props.click(props.topic)} size="small" color="secondary" aria-label="add">
  <AddIcon />
</Fab>
  </div>
)
}
