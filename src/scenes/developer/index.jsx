import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  useTheme,
} from "@mui/material";
import { Timeline } from "@mui/icons-material";

const DeveloperDashboard = () => {
  const theme = useTheme();

  const projets = [
    {
      nom: "Projet X",
      responsable: "Mr. Y",
      budgetPrevu: 100000,
      budgetReel: 105000,
      datePrevue: "2025-05-01",
      dateReelle: "2025-06-01",
    },
    {
      nom: "Projet Z",
      responsable: "Mme. A",
      budgetPrevu: 80000,
      budgetReel: 76000,
      datePrevue: "2025-03-01",
      dateReelle: "2025-03-01",
    },
  ];

  return (
    <Box m={4}>
        <Typography
  variant="h2"
  sx={{
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff", // texte blanc pour fond sombre
    mb: 3,
    textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
    letterSpacing: "2px",
    position: "relative",
    "&::after": {
      content: '""',
      display: "block",
      width: "80px",
      height: "4px",
      backgroundColor: "#00e676", // vert fluo pour contraste
      margin: "10px auto 0",
      borderRadius: "2px",
    },
  }}
>
  Espace Développeurs
</Typography>

      <Typography variant="h4" gutterBottom>
        Projets Assignés - Développeur
      </Typography>

      <Grid container spacing={3}>
        {projets.map((projet, idx) => {
          const retard =
            new Date(projet.dateReelle) > new Date(projet.datePrevue);
          const depassement = projet.budgetReel > projet.budgetPrevu;

          return (
            <Grid item xs={12} md={6} key={idx}>
              <Paper
                elevation={5}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Timeline color="primary" />
                  <Typography variant="h6">{projet.nom}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle1" mb={1}>
                  Responsable : {projet.responsable}
                </Typography>

                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Budget Prévu</TableCell>
                      <TableCell>Budget Réel</TableCell>
                      <TableCell>D. Prévue</TableCell>
                      <TableCell>D. Réelle</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{projet.budgetPrevu} MAD</TableCell>
                      <TableCell
                        sx={{
                          color: depassement ? "error.main" : "success.main",
                        }}
                      >
                        {projet.budgetReel} MAD
                      </TableCell>
                      <TableCell>{projet.datePrevue}</TableCell>
                      <TableCell
                        sx={{
                          color: retard ? "error.main" : "success.main",
                        }}
                      >
                        {projet.dateReelle}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Box mt={2}>
                  {retard && (
                    <Chip
                      label="Retard"
                      color="error"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                  )}
                  {depassement && (
                    <Chip label="Dépassement Budget" color="error" variant="outlined" />
                  )}
                  {!retard && !depassement && (
                    <Chip label="Projet conforme" color="success" variant="outlined" />
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DeveloperDashboard;
