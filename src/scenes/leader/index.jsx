import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CheckCircle, WarningAmber } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const LeaderDashboard = () => {
  const theme = useTheme();

  // Liste des services et projets associés
  const dataServices = {
    "Service Informatique": [
      { nom: "Migration Serveur", avancement: 80, enRetard: false },
      { nom: "Développement Intranet", avancement: 45, enRetard: true },
    ],
    "Service Marketing": [
      { nom: "Campagne Réseaux Sociaux", avancement: 70, enRetard: false },
      { nom: "Refonte Branding", avancement: 50, enRetard: false },
    ],
    "Service RH": [
      { nom: "Recrutement Développeurs", avancement: 60, enRetard: false },
      { nom: "Mise à jour du Règlement", avancement: 30, enRetard: true },
    ],
  };

  const [serviceChoisi, setServiceChoisi] = useState("Service Informatique");

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
  Espace Leader
</Typography>

      <Typography variant="h4" gutterBottom>
        Tableau de bord - Chef de Service
      </Typography>

      {/* Sélecteur de service */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Choisir un service</InputLabel>
        <Select
          value={serviceChoisi}
          label="Choisir un service"
          onChange={(e) => setServiceChoisi(e.target.value)}
        >
          {Object.keys(dataServices).map((service, index) => (
            <MenuItem key={index} value={service}>
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Liste des projets du service sélectionné */}
      <Grid container spacing={3}>
        {dataServices[serviceChoisi].map((projet, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight={600}>
                  {projet.nom}
                </Typography>
                <Chip
                  label={projet.enRetard ? "En retard" : "À l'heure"}
                  icon={
                    projet.enRetard ? (
                      <WarningAmber color="error" />
                    ) : (
                      <CheckCircle color="success" />
                    )
                  }
                  color={projet.enRetard ? "error" : "success"}
                  variant="outlined"
                />
              </Box>

              <Typography variant="body1" mt={2}>
                Avancement : {projet.avancement}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={projet.avancement}
                sx={{
                  height: 10,
                  mt: 1,
                  borderRadius: 5,
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: projet.enRetard
                      ? "#f44336"
                      : "#4caf50",
                  },
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LeaderDashboard;
