import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const UserSpace = () => {
  const data = [
    { id: "burndown", data: [
      { x: "S1", y: 100 },
      { x: "S2", y: 80 },
      { x: "S3", y: 60 },
      { x: "S4", y: 45 },
      { x: "S5", y: 30 },
      { x: "S6", y: 15 },
      { x: "S7", y: 5 },
      { x: "S8", y: 0 },
    ]}];

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom>Mon espace</Typography>
      <Paper sx={{ p:2, borderRadius: 2 }}>
        <Typography variant="h6">Burndown Chart (mock)</Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveLine data={data} margin={{ top: 20, right: 30, bottom: 40, left: 40 }} xScale={{ type: 'point' }} yScale={{ type: 'linear' }} axisBottom={{ tickRotation: 0 }} axisLeft={{ tickValues: 5 }} enablePoints={true} />
        </Box>
      </Paper>
      <Paper sx={{ p:2, borderRadius: 2, mt:2 }}>
        <Typography variant="h6">Mes projets (mock)</Typography>
        <Typography>Projet A — Alerte: risque de retard</Typography>
        <Typography>Projet B — Conforme</Typography>
      </Paper>
    </Box>
  );
};

export default UserSpace;


