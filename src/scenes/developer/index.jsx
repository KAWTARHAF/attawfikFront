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
import { ResponsiveBar } from "@nivo/bar";

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

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" mb={1}>Logs de prédiction (mock)</Typography>
            <Box sx={{ maxHeight: 200, overflowY: "auto", fontFamily: "monospace", fontSize: 12 }}>
              {[1,2,3,4,5].map(i => (
                <Box key={i}>[info] {new Date().toISOString()} - predict(project{i}) ➜ risk= {Math.random()>0.5?"HIGH":"LOW"}</Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" mb={1}>Variables d’importance (SHAP simulé)</Typography>
            <Box sx={{ height: 220 }}>
              <ResponsiveBar
                data={[{feature:"budget_var", val: 0.42},{feature:"delai_var", val:0.33},{feature:"complexite", val:0.22}]}
                keys={["val"]}
                indexBy="feature"
                margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                padding={0.3}
                colors={{ scheme: "nivo" }}
                axisBottom={{ tickRotation: -20 }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

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

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p:2, borderRadius: 2 }}>
            <Typography variant="h6" mb={1}>Évaluation du modèle (mock)</Typography>
            <Typography>Precision: 0.87 | Recall: 0.78 | ROC-AUC: 0.91</Typography>
            <Typography variant="body2" color="text.secondary">Comparaison v1.2 vs v1.3: +2% AUC</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p:2, borderRadius: 2 }}>
            <Typography variant="h6" mb={1}>Exports datasets</Typography>
            <Box display="flex" gap={1}>
              <a href={`data:text/csv;charset=utf-8,${encodeURIComponent("col1,col2\n1,2\n3,4")}`} download="dataset_sample.csv">Télécharger CSV</a>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeveloperDashboard;
