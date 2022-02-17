import React from "react";
import styled from "styled-components";
import { Typography, Button, Modal, Box, TextField } from "@mui/material";
import axios from "axios";

const AddUserModalWrapper = styled.div`
  display: static;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  .textField {
    margin: 20px;
  }
`;

const AddUserModal = ({ isAddUserModalOpen, setAddUserModalOpen }) => {
  const handleOnSubmit = (e) => {
    const newUser = {
      firstName: e.target[0].value,
      lastName: e.target[2].value,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:8080/users", newUser, headers)
      .then((res) => console.log(res));
    e.preventDefault();
  };

  return (
    <>
      <Modal
        open={isAddUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" align="center">
            Add New User
          </Typography>

          <StyledForm onSubmit={handleOnSubmit}>
            <TextField
              className="textField"
              id="demo-helper-text-misaligned-no-helper"
              label="First Name"
            />
            <TextField
              className="textField"
              id="demo-helper-text-misaligned-no-helper"
              label="Last Name"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => ""}
            >
              ADD USER
            </Button>
          </StyledForm>
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
