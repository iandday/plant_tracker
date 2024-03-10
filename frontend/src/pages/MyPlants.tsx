import { Grid, Typography } from '@mui/material';
import { AreaApi, AreaReturn, PlantApi, PlantReturn } from '../services';
import { useEffect, useState } from 'react';
import LabelBottomNavigation from '../components/Navigation';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
const MyPlants = () => {
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaReturn>();
  const [plantData, setPlantData] = useState<PlantReturn>();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const areaResponse = await areaApi.getAreasAreaGet();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
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

      {plantData && areaData ? <PlantListing plants={plantData} areas={areaData} /> : null}

      <LabelBottomNavigation />
    </>
  );
};

export default MyPlants;
