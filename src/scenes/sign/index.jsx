import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const users = [
  { email: "admin@demo.com", password: "admin123", role: "admin" },
  { email: "manager@demo.com", password: "manager123", role: "manager" },
  { email: "leader@demo.com", password: "leader123", role: "leader" },
  { email: "dev@demo.com", password: "dev123", role: "developer" },
];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify({ email: user.email, role }));

      // Historique des connexions (localStorage)
      try {
        const prev = JSON.parse(localStorage.getItem("loginHistory") || "[]");
        prev.push({ email: user.email, role, date: new Date().toISOString() });
        localStorage.setItem("loginHistory", JSON.stringify(prev));
      } catch (e) {}

      switch (role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "leader":
          navigate("/leader");
          break;
        case "developer":
          navigate("/developer");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      setError("Identifiants ou rôle incorrects.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion avec rôle
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Adresse Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-label">Rôle</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="leader">Leader</MenuItem>
                <MenuItem value="developer">Développeur</MenuItem>
              </Select>
            </FormControl>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Se connecter
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
