import { Box, Button, IconButton, Typography, useTheme, Paper } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // ⬅️ INITIALISATION

  // Rôle actuel (depuis connexion)
  const userRole = JSON.parse(localStorage.getItem("user"))?.role || "guest";

  // Simulation de projets IA pour validation
  const projetsIA = [
    { id: 1, nom: "Projet Alpha", retard: "Oui", depassement: "Non" },
    { id: 2, nom: "Projet Beta", retard: "Non", depassement: "Oui" },
  ];

  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Espace Administrateur" subtitle="Supervision & Gestion des accès" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Télécharger Rapports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">

      

        {/* Graphique revenus */}
        <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Revenus générés
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                $59,342.32
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

{/* Gestion des droits */}
<Box
  gridColumn="span 6"
  gridRow="span 2"
  bgcolor={colors.primary[400]}
  p="20px"
  borderRadius="12px"
  boxShadow={3}
  display="flex"
  alignItems="center"
  justifyContent="center"
  minHeight="300px" // 🔹 hauteur minimale
>
  <Paper
    elevation={4}
    sx={{
      p: 3,
      bgcolor: colors.primary[500],
      borderRadius: 3,
      textAlign: "center",
      width: "100%",
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      mb={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={colors.grey[100]}
    >
      <SecurityIcon sx={{ mr: 1, color: colors.greenAccent[500], fontSize: 28 }} />
      Gestion des droits d’accès
    </Typography>

    <Typography variant="body1" color={colors.grey[200]} mb={3}>
      Gérer les rôles des utilisateurs, ajouter ou supprimer des accès.
    </Typography>

    <Button
      variant="contained"
      startIcon={<SecurityIcon />}
      sx={{
        backgroundColor: colors.greenAccent[600],
        "&:hover": { backgroundColor: colors.greenAccent[700] },
        fontWeight: "bold",
      }}
      onClick={() => navigate("./accessManagement")}
    >
      Aller à la gestion des droits
    </Button>
  </Paper>
</Box>

{/* Validation IA */}
<Box
  gridColumn="span 6"
  gridRow="span 2"
  bgcolor={colors.primary[400]}
  p="20px"
  borderRadius="12px"
  boxShadow={3}
>
  <Paper
    elevation={4}
    sx={{
      p: 2,
      bgcolor: colors.primary[500],
      borderRadius: 3,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Typography
      variant="h6"
      fontWeight="bold"
      mb={2}
      display="flex"
      alignItems="center"
      color={colors.grey[100]}
    >
      <CheckCircleIcon sx={{ mr: 1, color: colors.greenAccent[500], fontSize: 24 }} />
      Validation des prédictions IA
    </Typography>

    {/* Conteneur scrollable */}
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        maxHeight: "200px", // 🔹 limite la hauteur visible
        pr: 1, // petit padding à droite pour éviter que le scroll colle
      }}
    >
      {projetsIA.map((p) => (
        <Paper
          key={p.id}
          elevation={1}
          sx={{
            p: 1.5,
            bgcolor: colors.primary[600],
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            color={colors.greenAccent[400]}
            fontWeight="bold"
          >
            {p.nom}
          </Typography>
          <Typography variant="caption" color={colors.grey[300]}>
            Retard : {p.retard} | Dépassement : {p.depassement}
          </Typography>

          <Box display="flex" gap={0.5} mt={0.5}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: "0.7rem",
                borderColor: colors.greenAccent[500],
                color: colors.greenAccent[500],
                "&:hover": {
                  backgroundColor: colors.greenAccent[600],
                  color: colors.grey[900],
                },
              }}
            >
              Valider
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: "0.7rem",
                borderColor: colors.blueAccent[500],
                color: colors.blueAccent[500],
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[900],
                },
              }}
            >
              Corriger
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: "0.7rem",
                borderColor: colors.redAccent[500],
                color: colors.redAccent[500],
                "&:hover": {
                  backgroundColor: colors.redAccent[600],
                  color: colors.grey[900],
                },
              }}
            >
              Annuler
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  </Paper>
</Box>

        {/* Graphiques divers */}
        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600">Campagne</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>$48,352 générés</Typography>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>Quantité des ventes</Typography>
          <Box height="250px" mt="-20px"><BarChart isDashboard={true} /></Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>Trafic par région</Typography>
          <Box height="200px"><GeographyChart isDashboard={true} /></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
