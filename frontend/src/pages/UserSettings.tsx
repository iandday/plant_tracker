import { Button, Grid, Stack, Typography } from '@mui/material';
import ThemeToggler from '../components/ThemeToggler';
import { useNavigate } from 'react-router-dom';
import LabelBottomNavigation from '../components/Navigation';

const UserSettings = () => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container justifyContent="center" padding={1}>
        <Typography variant="h4">Settings</Typography>
      </Grid>
      <Stack>
        <ThemeToggler />
        <Button
          variant="text"
          onClick={() => {
            navigate(`/locations`);
          }}
        >
          Locations
        </Button>
        <Button
          variant="text"
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Login
        </Button>
      </Stack>
      <LabelBottomNavigation />
    </>
  );
};

export default UserSettings;
