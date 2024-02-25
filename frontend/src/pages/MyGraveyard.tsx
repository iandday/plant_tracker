import React, { useEffect, useState } from 'react';
import { AreaApi, AreaReturn, PlantApi, PlantReturn } from '../services';
import { Grid, Typography } from '@mui/material';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';

const MyGraveyard = () => {
  const api = new PlantApi(null, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(null, BASE_PATH, axiosInstance);
  const [plantData, setPlantData] = useState<PlantReturn>();
  const [areaData, setAreaData] = useState<AreaReturn>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPlantPlantGet(false, true);
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const areaResponse = await areaApi.getAreasAreaGet();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {}
      console.log(areaData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areaResponse = await areaApi.getAreasAreaGet();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {}
      console.log(areaData);
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
      {plantData && areaData ? <PlantListing plants={plantData} areas={areaData} /> : null}
    </>
  );
};

export default MyGraveyard;
