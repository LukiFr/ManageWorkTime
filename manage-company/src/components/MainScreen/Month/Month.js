import React from "react";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

const StyledMonth = styled.p`
  position: absolute;
  margin: 20px 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Month = ({ month }) => {
  return (
    <Paper
      sx={{ width: "85%", maxWidth: "100%", height: 100, margin: "20px auto" }}
    >
      <StyledMonth>{month}</StyledMonth>
    </Paper>
  );
};

export default Month;
