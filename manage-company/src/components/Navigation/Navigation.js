import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = ({ setAddUserModalOpen }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/main">
            MAIN SCREEN
          </Button>
          <Button color="inherit" component={NavLink} to="/workDays/workDays">
            WORK DAYS
          </Button>
          <Button color="inherit" component={NavLink} to="/users">
            USERS
          </Button>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          {useLocation().pathname === "/users" ? (
            <Button
              color="inherit"
              component={NavLink}
              to="/users"
              onClick={() => setAddUserModalOpen(true)}
            >
              ADD USER
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
