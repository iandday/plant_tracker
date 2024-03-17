import { Button, Grid, Stack, Typography } from '@mui/material';
import ThemeToggler from '../components/ThemeToggler';
import { useNavigate } from 'react-router-dom';
import LabelBottomNavigation from '../components/Navigation';
import { Helmet } from 'react-helmet';
// import axiosInstance from '../provider/CustomAxios';
// import { BASE_PATH } from '../services/base';
// import { AreaApi, AreaReturn, LocationApi, LocationReturn } from '../services';
// import { useState } from 'react';

const UserSettings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // const locationApi = new LocationApi(undefined, BASE_PATH, axiosInstance);
  // const [locationData, setLocationData] = useState<LocationReturn>();
  // const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  // const [areaData, setAreaData] = useState<AreaReturn>();

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | User Settings'}</title>
      </Helmet>
      plantData?.name
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
