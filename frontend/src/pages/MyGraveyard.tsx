import React, { useEffect, useState } from 'react';
import { LocationApi, LocationReturn, PlantApi, PlantReturn } from '../services';
import { Grid, Typography } from '@mui/material';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';

const MyGraveyard = () => {
  const api = new PlantApi(null, BASE_PATH, axiosInstance);
  const locationApi = new LocationApi(null, BASE_PATH, axiosInstance);
  const [plantData, setPlantData] = useState<PlantReturn>();
  const [locationData, setLocationData] = useState<LocationReturn>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPlantPlantGet({ params: { graveyard_only: true } });
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const locationResponse = await locationApi.getLocationsLocationGet();
        if (locationResponse.status === 200) {
          setLocationData(locationResponse.data);
        }
      } catch (err) {}
      console.log(locationData);
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
      console.log(locationData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="stretch" style={{ marginBottom: 8 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            My Graveyard
          </Typography>
        </Grid>
      </Grid>
      {plantData && locationData ? <PlantListing plants={plantData} locations={locationData} /> : null}
    </>
  );
};

export default MyGraveyard;
