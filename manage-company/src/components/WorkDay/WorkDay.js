import React, { useState, useEffect } from "react";
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
import WorkDays from "./WorkDays/WorkDays.js";
import NewWorkDay from "./NewWorkDay/NewWorkDay.js";
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

  .menuLink {
    text-decoration: none;
    color: black;
  }
`;

const WorkDay = () => {
  return (
    <StyledNewWorkDay>
      <Paper sx={{ width: 320, maxWidth: "100%", height: "100px" }}>
        <MenuList>
          <MenuItem>
            <ListItemText>
              <Link to={`workDays`} className="menuLink">
                Work Days
              </Link>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>
              <Link to={`newWorkDay`} className="menuLink">
                New Work Day
              </Link>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      <Routes>
        <Route path="workDays" element={<WorkDays />}></Route>
        <Route path="newWorkDay" element={<NewWorkDay />} />
      </Routes>
    </StyledNewWorkDay>
  );
};

export default WorkDay;
