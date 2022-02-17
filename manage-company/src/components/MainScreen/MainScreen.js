import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Month from "./Month/Month.js";
import WorkDay from "../WorkDay/WorkDay.js";

const StyledMainScreen = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
`;

const MainScreen = () => {
  const [workDays, setWorkDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [totalWorkTime, setTotalWorkTime] = useState([]);

  const findMonths = () => {
    setMonths(
      workDays
        .reduce((acc, curr, index) => {
          const curDate =
            curr.date.split("/")[1] + "/" + curr.date.split("/")[2];
          if (index === 0) {
            acc = [
              workDays[0].date.split("/")[1] +
                "/" +
                workDays[0].date.split("/")[2],
            ];
          }
          return acc.indexOf(curDate) ? [...acc, curDate] : acc;
        }, [])
        .sort(
          (a, b) =>
            new Date(a.split("/")[1], a.split("/")[0], 1) -
            new Date(b.split("/")[1], b.split("/")[0], 1)
        )
    );
  };

  const calcTotalWorkTime = () => {
    const x = months.map((x) => [x]);
    console.log(x);
  };

  const fetchServerData = () => {
    axios.get("http://localhost:8080/workdays").then((res) => {
      setWorkDays(res.data);
    });
  };

  useEffect(() => {
    fetchServerData();
  }, []);

  useEffect(() => {
    findMonths();
    console.log(workDays);
  }, [workDays]);

  return (
    <StyledMainScreen>
      <button onClick={calcTotalWorkTime}>CLICK</button>
      <Paper sx={{ width: 1000, maxWidth: "100%" }}>
        {months.map((x) => (
          <Month month={x} />
        ))}
      </Paper>
    </StyledMainScreen>
  );
};

export default MainScreen;
