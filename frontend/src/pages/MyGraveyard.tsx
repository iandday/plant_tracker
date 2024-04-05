import { useEffect, useState } from 'react';
import { AreaApi, AreaOut, PlantApi, PlantOut } from '../services';
import { Grid, Typography } from '@mui/material';
import PlantListing from '../components/PlantListing';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Helmet } from 'react-helmet-async';

const MyGraveyard = () => {
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [plantData, setPlantData] = useState<PlantOut[]>();
  const [areaData, setAreaData] = useState<AreaOut[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.trackerApiViewPlantListPlants(false, true);
        if (response.status === 200) {
          setPlantData(response.data);
          console.log(response.data);
        }
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
        <title>{import.meta.env.VITE_APP_NAME + ' | Graveyard'}</title>
      </Helmet>
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
