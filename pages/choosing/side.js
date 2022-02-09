import React, { useState } from "react"
import { Button } from 'react-bootstrap';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import styles from "../../styles/Transcript.module.css";
import {getSession, useSession } from "next-auth/react";
export default function Side(props) {
  const { data: session } = useSession()
  const postData = async () => {
    const response = await fetch("/api/db/Calls/SideChoosing", {
      method: "POST",
      body: JSON.stringify({ side: props.side, user: session.user.name }),
    });
    const sideObject = response.json();

    sideObject.then(function(resu) {
      // console.log(resu);
      props.create(resu);
    });
  }
  return(
    <div className={styles.list_container}>

    <ul className={styles.list}>
    {props.elements}

    </ul>
<Button onClick={postData} className={styles.joinbutton} size="lg">Join {props.side}</Button>
    </div>
  )

}
