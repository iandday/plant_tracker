import { Button, Grid, Stack, Typography } from '@mui/material';
import ThemeToggler from '../components/ThemeToggler';
import { useNavigate } from 'react-router-dom';
import LabelBottomNavigation from '../components/Navigation';

const UserSettings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
            navigate(`/myProfile`);
          }}
        >
          My Profile
        </Button>
        <Button
          variant="text"
          onClick={() => {
            navigate(`/locations`);
          }}
        >
          Configure Locations
        </Button>
        <Button
          variant="text"
          onClick={() => {
            navigate(`/areas`);
          }}
        >
          Configure Areas
        </Button>

        {!token && (
          <>
            <Button
              variant="text"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Login
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate(`/register`);
              }}
            >
              Register
            </Button>
          </>
        )}
        {token && (
          <Button
            variant="text"
            onClick={() => {
              localStorage.setItem('token', '');
              localStorage.setItem('refreshToken', '');
              navigate(`/login`);
            }}
          >
            Logout
          </Button>
        )}
      </Stack>
      <LabelBottomNavigation />
    </>
  );
};

export default UserSettings;
