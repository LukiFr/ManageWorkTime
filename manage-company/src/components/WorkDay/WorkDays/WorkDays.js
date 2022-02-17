import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { set } from "date-fns";
import Button from "@mui/material/Button";

const NewWorkDay = () => {
  const [workDays, setWorkDays] = useState([]);

  const columns = [
    {
      field: "number",
      headerName: "Number",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "emplNumber",
      headerName: "Num. of employees",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      width: 180,
      align: "center",

      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => deleteWorkDay(params.row.id)}
          >
            DELETE
          </Button>
        );
      },
    },
  ];

  const fetchServerData = () => {
    axios.get("http://localhost:8080/workdays").then((res) => {
      setWorkDays(
        [...res.data].map((x, index) => {
          return {
            id: x._id,
            number: index + 1,
            date: x.date.split("T")[0],
            emplNumber: x.users.length,
          };
        })
      );
    });
  };

  const deleteWorkDay = (id) => {
    axios
      .delete(`http://localhost:8080/workdays?id=${id}`)
      .then(() => fetchServerData());
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  return (
    <Paper sx={{ width: 1000, maxWidth: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={workDays}
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

export default NewWorkDay;
