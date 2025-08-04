import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import PrivateRoute from "./PrivateRoute";

import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SignIn from "./scenes/sign";
import ManagerDashboard from "./scenes/manager";
import DeveloperDashboard from "./scenes/developer";
import LeaderDashboard from "./scenes/leader";
import AccessManagement from "./scenes/dashboard/AccessManagement";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {/* Page publique : connexion */}
              <Route path="/" element={<SignIn />} />

              {/* Routes protégées */}
              <Route
                path="/form"
                element={
                  <PrivateRoute>
                    <Form />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bar"
                element={
                  <PrivateRoute>
                    <Bar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pie"
                element={
                  <PrivateRoute>
                    <Pie />
                  </PrivateRoute>
                }
              />
              <Route
                path="/line"
                element={
                  <PrivateRoute>
                    <Line />
                  </PrivateRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <PrivateRoute>
                    <FAQ />
                  </PrivateRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/geography"
                element={
                  <PrivateRoute>
                    <Geography />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manager"
                element={
                  <PrivateRoute>
                    <ManagerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/developer"
                element={
                  <PrivateRoute>
                    <DeveloperDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/leader"
                element={
                  <PrivateRoute>
                    <LeaderDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/accessManagement"
                element={
                  <PrivateRoute>
                    <AccessManagement />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
