import React, { useState } from "react"
import { Button } from 'react-bootstrap';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import VirtualizedList from "./VirtualizedList.jsx"
import styles from "../../styles/Side.module.css";
import {getSession, useSession } from "next-auth/react";
import { positions } from '@mui/system';
export default function Side(props) {
  const { data: session } = useSession()
  const postData = async () => {
    console.log(localStorage);
   console.log(props);
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
<div>
<Box className={styles.list_container}
  sx={{ width: 360, height: 500, maxWidth: 360, border:2
 }}
>

<VirtualizedList
  numItems={props.elements.length?props.elements.length:0}
        itemHeight={40}
        windowHeight={500}
        renderItem={({ index, style }) => {
          const i = props.elements[index];
          console.log(i);
              console.log(props);
          return (
            <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemText primary={i.user.name} />
             </ListItem>
          );
        }}
/>

</Box>
<Button onClick={postData} className={styles.joinbutton} size="lg">Join {props.side}</Button>
</div>
  )

}
// <div key={index} className="item" style={style}>
//   <label>
//     {i.user.name}
//   </label>
// </div>
// <FixedSizeList
// height={500}
// width={360}
// itemSize={46}
// itemCount={200}
// overscanCount={5}
// component="ul"
// >
// {props.elements}
// </FixedSizeList>
