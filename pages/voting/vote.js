import React from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';
import Head from "next/head"

import styles from "../../styles/Vote.module.css";

export default function Vote(){
  return(
   <div className="voteContainer">
    <form className={styles.create_vote}>
     <input  type="text" placeholder="Topic name"></input>
       <textarea  placeholder="Topic Description"></textarea>
    </form>

   </div>
  )
}
