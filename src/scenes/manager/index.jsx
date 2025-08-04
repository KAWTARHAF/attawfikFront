import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from "@mui/material";
import { Assessment, Download } from "@mui/icons-material";

const ManagerDashboard = () => {
  const theme = useTheme();

  const projets = [
    {
      nom: "Projet Alpha",
      predictionIA: "Risque élevé de dépassement",
      risque: true,
      depassement: true,
      avancement: "65%",
    },
    {
      nom: "Projet Beta",
      predictionIA: "Risque faible",
      risque: false,
      depassement: false,
      avancement: "92%",
    },
  ];

  const exportReport = () => {
    alert("Rapport exporté (simulation) !");
  };

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
  Espace Manager
</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tableau de bord - Chef de Département</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={exportReport}
        >
          Exporter Rapport
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projets.map((projet, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Assessment color="primary" />
                <Typography variant="h6">{projet.nom}</Typography>
              </Box>

              <Typography variant="body1" mb={2}>
                Prédiction IA :{" "}
                <Chip
                  label={projet.predictionIA}
                  color={projet.risque ? "error" : "success"}
                  variant="outlined"
                />
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Avancement</TableCell>
                    <TableCell>Dépassement</TableCell>
                    <TableCell>Risque</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{projet.avancement}</TableCell>
                    <TableCell>
                      <Chip
                        label={projet.depassement ? "Oui" : "Non"}
                        color={projet.depassement ? "error" : "success"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={projet.risque ? "Élevé" : "Faible"}
                        color={projet.risque ? "error" : "success"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManagerDashboard;
