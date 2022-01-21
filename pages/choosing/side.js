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
  const [sides, setSides] = useState();
  const [pro, setPro] = useState([]);
  const [con, setCon] = useState([]);
  const { data: session } = useSession()

  console.log(props.side)

  function createLi(sides) {

    const pros = []
    const cons = []
    sides.forEach(function(element) {
      if (element.side == props.side) {
        if (element.side == "Pro") {
          pros.push(element.user.name)
        } else {
          cons.push(element.user.name)
        }
      }
    })
    console.log(pros);
    console.log(cons);
    setPro(pros);
    setCon(cons);
  }


  const postData = async () => {
    const response = await fetch("/api/db/Calls/SideChoosing", {
      method: "POST",
      body: JSON.stringify({ side: props.side, user: session.user.name }),
    });
    const sideObject = response.json();

    sideObject.then(function(resu) {
      createLi(resu);
    });
  }

  return(
    <div className={styles.list_container}>

    <ul className={styles.list}>
    {console.log(pro.toString()+"This is con"+con.toString())}
   {props.side=="Pro"&&pro.map((item,index) => (
     <li key={index}>     {item}
     </li>
   ))}

 { props.side=="Con"&&con.map((item,index) => (
     <li key={index}>{item} </li>
       ))}}

     <Button onClick={postData} className={styles.joinbutton} size="lg">Join {props.side}</Button>
    </ul>

    </div>
  )

}

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
