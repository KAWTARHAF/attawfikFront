import React, { useMemo, useState } from "react";
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Assessment, Download } from "@mui/icons-material";
import { saveAs } from "file-saver";

const ManagerDashboard = () => {
  const theme = useTheme();

  const allProjets = [
    {
      nom: "Projet Alpha",
      predictionIA: "Risque élevé de dépassement",
      risque: true,
      depassement: true,
      avancement: "65%",
      service: "Informatique",
    },
    {
      nom: "Projet Beta",
      predictionIA: "Risque faible",
      risque: false,
      depassement: false,
      avancement: "92%",
      service: "Marketing",
    },
  ];
  const services = ["Tous", "Informatique", "Marketing"];
  const [serviceFiltre, setServiceFiltre] = useState("Tous");
  const projets = useMemo(() => {
    return serviceFiltre === "Tous"
      ? allProjets
      : allProjets.filter((p) => p.service === serviceFiltre);
  }, [serviceFiltre]);

  const exportReport = () => {
    const rows = projets.map((p) => ({
      nom: p.nom,
      service: p.service,
      prediction: p.predictionIA,
      risque: p.risque ? "Oui" : "Non",
      depassement: p.depassement ? "Oui" : "Non",
      avancement: p.avancement,
    }));
    const header = Object.keys(rows[0] || {}).join(",");
    const csv = [header, ...rows.map((r) => Object.values(r).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `rapport_${serviceFiltre}.csv`);
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
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Filtrer par service</InputLabel>
            <Select value={serviceFiltre} label="Filtrer par service" onChange={(e) => setServiceFiltre(e.target.value)}>
              {services.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", gap: 2, justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">% projets à risque</Typography>
              <Typography variant="h4" color={projets.filter(p=>p.risque).length>0?"error.main":"success.main"}>
                {((projets.filter((p) => p.risque).length / Math.max(projets.length,1)) * 100).toFixed(0)}%
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Moy. dépassement</Typography>
              <Typography variant="h4">{projets.filter(p=>p.depassement).length} proj.</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Tendance (approx.)</Typography>
              <Typography variant="h4">↗ stable</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
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

              <TextField fullWidth size="small" placeholder="Commentaire / feedback sur la prédiction" sx={{ mb: 2 }} />

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
