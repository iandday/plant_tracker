import { useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {entryData?.map((e) => {
            return (
              <ListItem key={e.id}>
                <ListItemIcon>{ratingIcons[e.plant_health].icon}</ListItemIcon>
                <ListItemButton component="a" href={'/entry/' + e.id}>
                  <ListItemText
                    primary={
                      findArrayElementByID(plantData, e.plant).name +
                      ': ' +
                      findArrayElementByID(plantData, e.plant).common_name
                    }
                    secondary={
                      e.activities
                        .map((a) => {
                          let match = activityData!.find((act) => act.id === a);
                          return match!.name;
                        })
                        .join(', ') +
                      ' at ' +
                      e.Timestamp
                    }
                  />
                  {e.photo ? (
                    <ListItemAvatar>
                      <Avatar src={`${import.meta.env.VITE_BACKEND_URL}${e.photo}`} />
                    </ListItemAvatar>
                  ) : null}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </>
  );
};

export default MyEntries;
