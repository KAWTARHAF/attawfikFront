import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  { id: 1, email: "admin@demo.com", role: "admin" },
  { id: 2, email: "manager@demo.com", role: "manager" },
  { id: 3, email: "leader@demo.com", role: "leader" },
  { id: 4, email: "dev@demo.com", role: "developer" },
];

const AccessManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("developer");
  const navigate = useNavigate();

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    if (!newEmail.trim()) return alert("Veuillez entrer un email.");
    const newUser = {
      id: Date.now(),
      email: newEmail,
      role: newRole,
    };
    setUsers([...users, newUser]);
    setNewEmail("");
    setNewRole("developer");
  };

  return (
    <Box m={4}>
      {/* Bouton retour */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 3 }}
      >
        Retour au Dashboard
      </Button>

      <Typography variant="h4" mb={2} fontWeight="bold">
        Gestion des droits d'accès
      </Typography>

      {/* Formulaire d'ajout d'utilisateur */}
      <Paper elevation={3} sx={{ p: 2, mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          fullWidth
        />
        <Select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="leader">Leader</MenuItem>
          <MenuItem value="developer">Développeur</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          sx={{ whiteSpace: "nowrap" }}
        >
          Ajouter
        </Button>
      </Paper>

      {/* Tableau des utilisateurs */}
      <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rôle</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="leader">Leader</MenuItem>
                    <MenuItem value="developer">Développeur</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AccessManagement;
