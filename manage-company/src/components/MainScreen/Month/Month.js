import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

const StyledMonth = styled.p`
  position: relative;
  margin: 0px 20px;
  font-size: 20px;
  font-weight: bold;
`;

const columns = [
  {
    field: "firstName",
    headerName: "First name",
    width: 140,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 140,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "totalTime",
    headerName: "Total Time",
    width: 140,
    headerAlign: "center",
    align: "center",
  },
];

const Month = ({ month, users }) => {
  const [tabbleUsers, setTabbleUsers] = useState([]);

  return (
    <Paper
      sx={{
        width: "85%",
        maxWidth: "100%",
        margin: "20px auto",
        padding: "20px 0px",
      }}
    >
      <StyledMonth>{month}</StyledMonth>
      <DataGrid
        sx={{ margin: "30px" }}
        getRowId={(row) => row._id}
        rows={users}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        autoHeight
        disableColumnFilter={true}
        disableColumnMenu
      />
    </Paper>
  );
};

export default Month;
