import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlantIcon from '@mui/icons-material/Yard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PrintIcon from '@mui/icons-material/Print';

const actions = [
  { icon: <PlantIcon />, name: 'Plant' },
  { icon: <ReceiptIcon />, name: 'Activity' },
  { icon: <HomeIcon />, name: 'Location' }
];

import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Grid container justifyContent="center">
        <Grid item justifyContent="flex-end">
          <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange} showLabels>
            <BottomNavigationAction
              sx={{ pl: 25 }}
              label="Plants"
              value="plants"
              onClick={() => navigate('/myPlants')}
              icon={<PlantIcon />}
            />

            <BottomNavigationAction
              label="Settings"
              value="settings"
              onClick={() => navigate('/settings')}
              icon={<SettingsIcon />}
            />
            <BottomNavigationAction
              sx={{ pr: 25 }}
              label="Activity"
              value="activity"
              onClick={() => navigate('/activity')}
              icon={<ReceiptIcon />}
            />
          </BottomNavigation>
        </Grid>
        <Grid item justifyContent="flex-start">
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 16,
              '& .MuiFab-primary': {
                width: 30,
                height: 30,
                '& .MuiSpeedDialIcon-icon': { fontSize: 25 }
              }
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </Grid>
      </Grid>
    </Paper>
  );
}
