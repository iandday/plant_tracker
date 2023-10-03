import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PlantIcon from "@mui/icons-material/Yard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Grid container justifyContent="center">
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            label="Plants"
            value="plants"
            onClick={() => navigate("/myPlants")}
            icon={<PlantIcon />}
          />
          <BottomNavigationAction
            label="Activity"
            value="activity"
            onClick={() => navigate("/activity")}
            icon={<ReceiptIcon />}
          />
          <BottomNavigationAction
            label="New Activity"
            value="nearby"
            icon={<AddCircleIcon />}
          />
          <BottomNavigationAction
            label="Settings"
            value="settings"
            onClick={() => navigate("/settings")}
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Grid>
    </Paper>
  );
}
