import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PlantIcon from "@mui/icons-material/Yard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  return (
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
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
