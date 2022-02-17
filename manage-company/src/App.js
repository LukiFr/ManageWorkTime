import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import Navigation from "./components/Navigation/Navigation";
import MainScreen from "./components/MainScreen/MainScreen";
import UsersScreen from "./components/UsersScreen/UsersScreen";
import WorkDay from "./components/WorkDay/WorkDay";

function App() {
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Navigation setAddUserModalOpen={setAddUserModalOpen} />
        <Routes>
          <Route path="main" element={<MainScreen />} />
          <Route
            path="users"
            element={
              <UsersScreen
                isAddUserModalOpen={isAddUserModalOpen}
                setAddUserModalOpen={setAddUserModalOpen}
              />
            }
          />
          <Route path="workDays/*" element={<WorkDay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
