import { Card, Grid, IconButton, ImageListItem, ImageListItemBar, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { LocationApi, LocationReturn, PlantApi, PlantReturn } from '../services';
import { useEffect, useState } from 'react';
import LabelBottomNavigation from '../components/Navigation';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
const MyPlants = () => {
  const api = new PlantApi();
  const locationApi = new LocationApi(null, BASE_PATH, axiosInstance);
  const [locationData, setLocationData] = useState<LocationReturn>();
  const [plantData, setPlantData] = useState<PlantReturn>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await APIClient.get(`/location`);
        const response = await api.getPlantPlantGet();
        if (response.status === 200) {
          setPlantData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await locationApi.getLocationsLocationGet();
        if (locationResponse.status === 200) {
          setLocationData(locationResponse.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="stretch" style={{ marginBottom: 8 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            My Plants
          </Typography>
        </Grid>
      </Grid>

      {plantData && locationData ? <PlantListing plants={plantData} locations={locationData} /> : null}

      <LabelBottomNavigation />
    </>
  );
};

export default MyPlants;
