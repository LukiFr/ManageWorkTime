import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Routes,
} from "react-router-dom";

const StyledNewWorkDay = styled.div`
  display: grid;
  grid-template-columns: 300px 1000px;
  justify-content: center;
  column-gap: 50px;
  margin: 50px 0px;
`;

const StyledForm = styled.form`
  display: ${({ isAddNewWorkerOpen }) =>
    isAddNewWorkerOpen ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

  .__formInput {
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;

  .CancelButton {
    display: ${({ isAddNewWorkerOpen }) =>
      isAddNewWorkerOpen ? "static" : "none"};
  }
`;

const DateSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;

const timeSlots = (x) => {
  const arr = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
        index % 2 === 0 ? "00" : "30"
      }`
  );

  return arr.slice(x, arr.length);
};

const NewWorkDay = () => {
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
      field: "startTime",
      headerName: "Start Time",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "endTime",
      headerName: "End Time",
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
            onClick={() => deleteUser(params.row._id)}
          >
            DELETE
          </Button>
        );
      },
    },
  ];

  const [workDayUsers, setWorkDayUsers] = useState({ users: [] });
  const [tabbleUsers, setTabbleUsers] = useState([]);
  const [isAddNewWorkerOpen, setisAddNewWorkerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [formUser, setFormUser] = useState("");
  const [formStartTime, setFormStartTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [dayID, setDayID] = useState(undefined);
  const [disableUsers, setDisableUsers] = useState([]);
  const [firstTimeInput, setFirstTimeInput] = useState(false);
  const [secondTimeInput, setSecondTimeInput] = useState(true);
  const [endTimeSlots, setEndTimeSlots] = useState(0);

  const autocomplete = useRef();

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/workday/user?id=${id}&dayID=${dayID}`)
      .then(() => fetchWorkDayUsers(dayID))
      .then(() =>
        setWorkDayUsers({
          users: workDayUsers.users.filter((x) => x._id !== id),
        })
      );
  };

  const searchDate = (date) => {
    axios
      .get(`http://localhost:8080/workday?date=${date}`)
      .then((res) => {
        setDayID(res.data[0]._id);
        setWorkDayUsers({ users: [...res.data[0].users] });
        return res.data[0]._id;
      })
      .then((res) => {
        fetchWorkDayUsers(res);
        //setDayID(res);
      })
      .catch(() => {
        setWorkDayUsers({ users: [] });
        setTabbleUsers([]);
        setDayID(undefined);
      });
  };

  const handleAddClick = () => {
    setisAddNewWorkerOpen(true);
  };

  const handleCancelClick = () => {
    setisAddNewWorkerOpen(false);
  };

  const handleFormSubmit = (e) => {
    const calcTotalTime = (end, start) => {
      start = start.split(":");
      end = end.split(":");
      var startDate = new Date(0, 0, 0, start[0], start[1], 0);
      var endDate = new Date(0, 0, 0, end[0], end[1], 0);
      var diff = endDate.getTime() - startDate.getTime();
      var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);

      // If using time pickers with 24 hours format, add the below line get exact hours
      if (hours < 0) hours = hours + 24;

      return (
        (hours <= 9 ? "0" : "") +
        hours +
        ":" +
        (minutes <= 9 ? "0" : "") +
        minutes
      );
    };

    const newWorkDayUser = {
      _id: formUser._id,
      firstName: formUser.firstName,
      lastName: formUser.lastName,
      startTime: formStartTime,
      endTime: formEndTime,
      totalTime: calcTotalTime(formEndTime, formStartTime),
    };

    setWorkDayUsers({
      date:
        date.getUTCDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getUTCFullYear(),
      users: [...workDayUsers.users, newWorkDayUser],
    });

    e.preventDefault();
    setFormUser("");
    setFirstTimeInput(false);
    setSecondTimeInput(true);
    setEndTimeSlots(0);
    setFormStartTime("");
    setFormEndTime("");
    setisAddNewWorkerOpen(false);
  };

  const fetchWorkDayUsers = (x) => {
    axios
      .get(`http://localhost:8080/workday?id=${x}`)
      .then((res) => res.data)
      .then((res) => setTabbleUsers([...res[0].users]));
  };

  useEffect(() => {
    if (workDayUsers.users.length !== 0) {
      const headers = {
        "Content-Type": "application/json",
      };

      if (!dayID) {
        axios
          .post("http://localhost:8080/workday", workDayUsers, headers)
          .then((res) => {
            setDayID(res.data.insertedId);
            fetchWorkDayUsers(res.data.insertedId);
          });
      } else if (dayID) {
        axios
          .put(
            `http://localhost:8080/workday?id=${dayID}`,
            workDayUsers,
            headers
          )
          .then(() => fetchWorkDayUsers(dayID));
      }
    }
  }, [workDayUsers]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => res.data)
      .then((res) => setUsers([...res]));

    searchDate(
      date.getUTCDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getUTCFullYear()
    );
  }, [date]);

  return (
    <Paper sx={{ width: 1000, maxWidth: "100%" }}>
      <DateSelectWrapper>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </DateSelectWrapper>

      <div style={{ width: "90%", margin: "20px auto" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={tabbleUsers}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          autoHeight
          disableColumnFilter={true}
          disableColumnMenu
        />
      </div>

      <StyledButtonContainer isAddNewWorkerOpen={isAddNewWorkerOpen}>
        <Button
          className={"AddButton"}
          onClick={isAddNewWorkerOpen ? handleCancelClick : handleAddClick}
          variant="contained"
          sx={{
            width: 180,
            maxWidth: "100%",
            height: "50px",
            display: "block",
            margin: "20px auto",
          }}
        >
          {isAddNewWorkerOpen ? "CANCEL" : "ADD"}
        </Button>
      </StyledButtonContainer>

      <StyledForm
        isAddNewWorkerOpen={isAddNewWorkerOpen}
        id={"AddNewWorkerForm"}
        onSubmit={handleFormSubmit}
        refresh={tabbleUsers}
      >
        <Autocomplete
          options={users}
          inputValue={
            formUser ? formUser.firstName + " " + formUser.lastName : ""
          }
          sx={{ width: 300, margin: "10px" }}
          renderInput={(params) => (
            <TextField {...params} label="Worker" required />
          )}
          getOptionLabel={(option) =>
            option.firstName.toString() + " " + option.lastName.toString()
          }
          getOptionDisabled={(option) => {
            if (tabbleUsers.map((x) => x._id).indexOf(option._id) != -1)
              return true;
          }}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          className={"__formInput"}
          onChange={(event, newValue) => setFormUser(newValue)}
        />

        <Autocomplete
          disabled={firstTimeInput}
          inputValue={formStartTime}
          options={timeSlots(endTimeSlots)}
          sx={{ width: 300, margin: "10px" }}
          renderInput={(params) => (
            <TextField {...params} label="Select start time" required />
          )}
          className={"__formInput"}
          onChange={(event, newValue) => {
            setFormStartTime(newValue);
            setFirstTimeInput(true);
            setSecondTimeInput(false);
            setEndTimeSlots(timeSlots().indexOf(newValue) + 1);
          }}
        />

        <Autocomplete
          disabled={secondTimeInput}
          inputValue={formEndTime}
          options={timeSlots(endTimeSlots)}
          sx={{ width: 300, margin: "10px" }}
          renderInput={(params) => (
            <TextField {...params} label="Select end time" required />
          )}
          className={"__formInput"}
          onChange={(event, newValue) => setFormEndTime(newValue)}
        />

        <Button
          className={"AddButton"}
          onClick={handleFormSubmit}
          type="submit"
          variant="contained"
          sx={{
            width: 180,
            maxWidth: "100%",
            height: "50px",
            display: "block",
            margin: "20px auto",
          }}
        >
          ADD
        </Button>
      </StyledForm>
    </Paper>
  );
};

export default NewWorkDay;
