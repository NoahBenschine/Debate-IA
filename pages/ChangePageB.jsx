import * as React from 'react';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

const ChangePageButton = styled(Button)(({ theme }) => ({
  fontFamily: "Helvetica",
   fontSize: 24,
   fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#f5ba13",
  width: "7%",
  height:"7%",
}));

export default function ChangePageB() {
  return <ChangePageButton />;
}
