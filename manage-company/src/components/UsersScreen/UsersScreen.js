import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import AddUserModal from "../AddUserModal/AddUserModal";
import axios from "axios";
import Button from "@mui/material/Button";

const deleteUser = (id) => {
  axios
    .delete(`http://localhost:8080/users/${id}`)
    .then((res) => console.log(res));
};

const columns = [
  {
    field: "firstName",
    headerName: "First name",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "delete",
    headerName: "",
    sortable: false,
    width: 180,
    align: "center",

    renderCell: (params) => {
      return (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => deleteUser(params.row._id)}
        >
          DELETE
        </Button>
      );
    },
  },
];

const DataGridWrapper = styled.div`
  margin: 50px 50px;
`;

const UsersScreen = ({ isAddUserModalOpen, setAddUserModalOpen }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => res.data)
      .then((res) => setUsers(res));
  });

  return (
    <>
      <DataGridWrapper>
        <div style={{ width: "30%", margin: "0px auto" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={users}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[50]}
            autoHeight
            disableColumnFilter={true}
            disableColumnMenu
          />
        </div>
      </DataGridWrapper>
      <AddUserModal
        isAddUserModalOpen={isAddUserModalOpen}
        setAddUserModalOpen={setAddUserModalOpen}
      />
    </>
  );
};

export default UsersScreen;
