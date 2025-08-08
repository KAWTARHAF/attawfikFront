import { Box, Button, Typography, useTheme, Paper, Table, TableHead, TableBody, TableRow, TableCell, TextField, Select, MenuItem, Grid, Stack, Divider } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // ⬅️ INITIALISATION

  // Rôle actuel (depuis connexion)
  const userRole = JSON.parse(localStorage.getItem("user") || "null")?.role || "guest";

  // Simulation de projets IA pour validation
  const projetsIA = [
    { id: 1, nom: "Projet Alpha", retard: "Oui", depassement: "Non" },
    { id: 2, nom: "Projet Beta", retard: "Non", depassement: "Oui" },
  ];

  const atRiskCount = projetsIA.filter(p => p.retard === "Oui" || p.depassement === "Oui").length;
  const loginHistory = JSON.parse(localStorage.getItem('loginHistory')||'[]');
  const lastRetraining = (() => {
    const r = JSON.parse(localStorage.getItem('retrainingHistory')||'[]');
    return r.length ? r[r.length-1].date : 'N/A';
  })();
  const usersMock = [
    { email: "admin@demo.com", role: "admin" },
    { email: "manager@demo.com", role: "manager" },
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

      {/* Organisation claire de l'espace Admin */}
      <Grid container spacing={2}>
        {/* KPIs */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="body2" color={colors.grey[300]}>Utilisateurs</Typography>
            <Typography variant="h4">{usersMock.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="body2" color={colors.grey[300]}>Projets à risque</Typography>
            <Typography variant="h4" color={atRiskCount?"error.main":"success.main"}>{atRiskCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="body2" color={colors.grey[300]}>Connexions récentes</Typography>
            <Typography variant="h4">{loginHistory.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="body2" color={colors.grey[300]}>Dernier réentraînement</Typography>
            <Typography variant="body2">{lastRetraining}</Typography>
          </Paper>
        </Grid>

        {/* Actions rapides */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <AdminPanelSettingsIcon />
              <Typography variant="h6">Gestion des droits</Typography>
            </Box>
            <Typography variant="body2" color={colors.grey[300]}>
              Ajouter/supprimer des accès, modifier rôles
            </Typography>
            <Box mt={2}><Button variant="contained" onClick={()=>navigate('./accessManagement')}>Ouvrir</Button></Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper id="params" sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <SettingsOutlinedIcon />
              <Typography variant="h6">Paramètres système</Typography>
            </Box>
            <Typography variant="body2" color={colors.grey[300]}>
              Modèle, seuil de risque, réentraînement
            </Typography>
          </Paper>
        </Grid>

        {/* Validation IA */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="h6" mb={1}>Validation des prédictions IA</Typography>
            <Box sx={{ maxHeight: 220, overflowY: 'auto', pr:1 }}>
              {projetsIA.map((p)=> (
                <Paper key={p.id} sx={{ p:1.5, mb:1, bgcolor: colors.primary[600], borderRadius:1 }}>
                  <Typography variant="subtitle2" color={colors.greenAccent[400]} fontWeight="bold">{p.nom}</Typography>
                  <Typography variant="caption" color={colors.grey[300]}>Retard: {p.retard} | Dépassement: {p.depassement}</Typography>
                  <Box display="flex" gap={0.5} mt={0.5}>
                    <Button size="small" variant="outlined">Valider</Button>
                    <Button size="small" variant="outlined">Corriger</Button>
                    <Button size="small" variant="outlined" color="error">Annuler</Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        {/* Historique connexions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="h6" mb={1}>Historique des connexions</Typography>
            <Box sx={{ maxHeight: 220, overflowY: 'auto', fontFamily: 'monospace', fontSize: 12 }}>
              {loginHistory.slice(-20).reverse().map((e,i)=> (
                <Box key={i}>{e.date} — {e.email} ({e.role})</Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Paramètres système */}
        <Grid item xs={12}>
          <Paper sx={{ p:2, bgcolor: colors.primary[400], borderRadius:2 }}>
            <Typography variant="h6" mb={1}>Paramètres système</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
              <Select size="small" defaultValue={localStorage.getItem('modelType')||'xgboost'} onChange={(e)=>localStorage.setItem('modelType', e.target.value)}>
                <MenuItem value="xgboost">XGBoost</MenuItem>
                <MenuItem value="random_forest">RandomForest</MenuItem>
                <MenuItem value="nn">NeuralNet</MenuItem>
              </Select>
              <TextField size="small" type="number" label="Seuil risque" defaultValue={localStorage.getItem('riskThreshold')||0.5}
                onBlur={(e)=>localStorage.setItem('riskThreshold', e.target.value)} />
              <Button variant="outlined" onClick={()=>{
                const prev = JSON.parse(localStorage.getItem('retrainingHistory')||'[]');
                prev.push({ date: new Date().toISOString(), by: 'admin' });
                localStorage.setItem('retrainingHistory', JSON.stringify(prev));
              }}>Réentraîner</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Section gestion utilisateurs supprimée comme demandé */}
    </Box>
  );
};

export default Dashboard;
