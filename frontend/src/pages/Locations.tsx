import { Grid, Typography } from "@mui/material";
import React from "react";

const Locations = () => {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        style={{ marginBottom: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Locations
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Locations;
