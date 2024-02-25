import { Card, Grid, IconButton, ImageListItem, ImageListItemBar, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { AreaApi, AreaReturn, PlantApi, PlantReturn } from '../services';
import { useEffect, useState } from 'react';
import LabelBottomNavigation from '../components/Navigation';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
const MyPlants = () => {
  const api = new PlantApi();
  const areaApi = new AreaApi(null, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaReturn>();
  const [plantData, setPlantData] = useState<PlantReturn>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await APIClient.get(`/area`);
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
