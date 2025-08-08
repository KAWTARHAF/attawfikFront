import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import PrivateRoute from "./PrivateRoute";

import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SignIn from "./scenes/sign";
import ManagerDashboard from "./scenes/manager";
import DeveloperDashboard from "./scenes/developer";
import LeaderDashboard from "./scenes/leader";
import AccessManagement from "./scenes/dashboard/AccessManagement";
import UserSpace from "./scenes/user";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true" &&
    !!localStorage.getItem("user");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Page publique : connexion */}
              <Route path="/" element={<SignIn />} />

              {/* Routes protégées */}
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
                path="/me"
                element={
                  <PrivateRoute>
                    <UserSpace />
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
              {/* Fallback: redirection selon état d'authentification */}
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
