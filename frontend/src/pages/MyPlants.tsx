import { Grid, Typography } from '@mui/material';
import { AreaApi, AreaOut, PlantApi, PlantOut } from '../services';
import { useEffect, useState } from 'react';
import LabelBottomNavigation from '../components/Navigation';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Helmet } from 'react-helmet-async';
const MyPlants = () => {
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaOut[]>();
  const [plantData, setPlantData] = useState<PlantOut[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.trackerApiViewPlantListPlants();
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
        const areaResponse = await areaApi.trackerApiViewAreaListAreas();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | My Plants'}</title>
      </Helmet>
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
