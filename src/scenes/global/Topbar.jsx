import { Box, IconButton, useTheme, InputBase, Paper, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    } catch (e) {}
    navigate("/", { replace: true });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Paper
        component="form"
        sx={{ display: "flex", alignItems: "center", backgroundColor: colors.primary[400], px: 1, borderRadius: 2, minWidth: 260 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <IconButton type="button" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Paper>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton aria-label="notifications">
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton aria-label="settings">
          <SettingsOutlinedIcon />
        </IconButton>
        <Tooltip title="Déconnexion">
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
