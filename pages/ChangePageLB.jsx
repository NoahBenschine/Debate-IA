import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/system';


const ChangePageButton = styled(Button)(({ theme }) => ({
  fontFamily: "Helvetica",
   fontSize: "1.2em",
   fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#f5ba13",
  position:"absolute",
  top:"0%",
  left:"0%",
  width: "7%",
  height:"7%",
}));

export default function ChangePageLB(props) {
  return (
      <ChangePageButton>{props.text}</ChangePageButton>
 );
}
