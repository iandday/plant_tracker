import { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Typography
} from '@mui/material';
import { ActivityApi, EntryApi, PlantApi, PlantOut } from '../services';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { AxiosResponse } from 'axios';
import { ratingIcons } from '../components/ratings';
import { Helmet } from 'react-helmet-async';
import { EntryOut } from '../services/models/entry-out';
import { ActivityOut } from '../services/models/activity-out';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import flower from '../flower.jpg';

const MyEntries = () => {
  const api = new EntryApi(undefined, BASE_PATH, axiosInstance);
  const plantApi = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const activityApi = new ActivityApi(undefined, BASE_PATH, axiosInstance);

  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState<EntryOut[]>();
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [plantDataLoaded, setPlantDataLoaded] = useState(false);
  const [activityData, setActivityData] = useState<ActivityOut[]>();

  // get entry details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.trackerApiViewEntryListEntries();
        if (response.status === 200) {
          setEntryData(response.data);
          const temp: PlantOut[] = [];
          var results: AxiosResponse<PlantOut>[] = await Promise.all(
            response.data.map(
              async (item): Promise<AxiosResponse<PlantOut>> => await plantApi.trackerApiViewPlantGetPlant(item.plant)
            )
          );

          results.map((result) => {
            const found = temp.some((record) => {
              if (record.id === result.data.id) {
                return true;
              }
              return false;
            });
            if (!found) {
              temp.push(result.data);
            }
          });

          setPlantData(temp);
        }
        const activityResponse = await activityApi.trackerApiViewActivityListActivities();
        if (activityResponse.status === 200) {
          setActivityData(activityResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      setPlantDataLoaded(true);
    };
    fetchData();
  }, []);

  function findArrayElementByID(array: PlantOut[], id: string): PlantOut | any {
    const result = array.find((element: PlantOut) => element.id === id);
    if (result) {
      return result;
    } else {
      return { name: 'Unknown' };
    }
  }

  if (!plantDataLoaded && loading) {
    return <>still loading plant: {plantDataLoaded}</>;
  }
  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Activity Entries'}</title>
      </Helmet>
      <Grid container justifyContent="space-between" alignItems="stretch" style={{ marginBottom: 8 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ marginBottom: 12 }}>
            My Plant Activity Entries
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems={'stretch'} flexGrow={1}>
        {entryData?.map((e) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={e.id}>
              <Card sx={{ maxWidth: 345, height: 450 }}>
                <CardActionArea component="a" href={'/entry/' + e.id}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ width: 28, height: 28 }}>
                        <Icon sx={{ fontSize: 35 }}>{ratingIcons[e.plant_health].icon}</Icon>
                      </Avatar>
                    }
                    title={findArrayElementByID(plantData, e.plant).name}
                    subheader={findArrayElementByID(plantData, e.plant).common_name}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={e.photo ? `${import.meta.env.VITE_BACKEND_URL}${e.photo}` : flower}
                  />
                  <CardContent>
                    <Typography color="text.secondary">
                      {e.activities
                        .map((a) => {
                          let match = activityData!.find((act) => act.id === a);
                          return match!.name;
                        })
                        .join(', ') +
                        ' at ' +
                        e.Timestamp}
                    </Typography>
                    <Typography variant="body2">{e.notes}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MyEntries;
