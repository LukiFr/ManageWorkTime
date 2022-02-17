import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Month from "./Month/Month.js";
import WorkDay from "../WorkDay/WorkDay.js";
import { monthsToQuarters } from "date-fns";

const StyledMainScreen = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
`;

const MainScreen = () => {
  const [workDays, setWorkDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [totalWorkTime, setTotalWorkTime] = useState([]);
  const [users, setUsers] = useState([]);

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
    const x = months
      .map((x) => {
        return { month: x, users: [] };
      })
      .filter(
        (v, i, a) =>
          a.findIndex((t) => ["month"].every((k) => t[k] === v[k])) === i
      );

    x.forEach((x) => {
      workDays.forEach((y) => {
        if (x.month === y.date.split("/")[1] + "/" + y.date.split("/")[2]) {
          x.users = [...x.users, ...y.users];
        }
      });
    });

    const result = x.map((x) => {
      const temp = x.users.reduce(function (results, org) {
        (results[org._id] = results[org._id] || []).push(org);
        return results;
      }, []);

      const final = Object.values(temp).map((x) => {
        const totalTime = () => {
          const time = x.map((y) => y.totalTime);
          let hours = 0,
            minutes = 0;
          time.forEach((time) => {
            const split = time.split(":");
            hours += parseInt(split[0]);
            minutes += parseInt(split[1]);
          });
          const formattedNumber = (num) => ("0" + num).slice(-2);
          hours += Math.floor(minutes / 60);
          minutes = minutes % 60;

          return formattedNumber(hours) + ":" + formattedNumber(minutes);
        };

        return {
          _id: x[0]._id,
          firstName: x[0].firstName,
          lastName: x[0].lastName,
          totalTime: totalTime(),
        };
      });

      return {
        month: x.month,
        users: final,
      };
    });

    setTotalWorkTime(result);
  };

  const fetchServerData = () => {
    axios.get("http://localhost:8080/workdays").then((res) => {
      setWorkDays(res.data);
    });
  };

  useEffect(() => {
    fetchServerData();

    axios
      .get("http://localhost:8080/users")
      .then((res) => res.data)
      .then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    findMonths();
  }, [workDays]);

  useEffect(() => {
    calcTotalWorkTime();
  }, [months]);

  return (
    <StyledMainScreen>
      <Paper sx={{ width: 1000, maxWidth: "100%" }}>
        {totalWorkTime.map((x, index) => (
          <Month key={index} month={x.month} users={x.users} />
        ))}
      </Paper>
    </StyledMainScreen>
  );
};

export default MainScreen;
