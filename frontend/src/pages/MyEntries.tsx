import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { EntryApi, EntryReturn, Plant, PlantApi } from '../services';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { AxiosResponse } from 'axios';
import { ratingIcons } from '../components/ratings';

const MyEntries = () => {
  const api = new EntryApi(null, BASE_PATH, axiosInstance);
  const plantApi = new PlantApi(null, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState<EntryReturn>();
  const [entryUpdate, setEntryUpdate] = useState<number>(0);
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [plantDataLoaded, setPlantDataLoaded] = useState(false);

  // get entry details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.getEntriesEntryGet();
        if (response.status === 200) {
          setEntryData(response.data);
          const temp: Plant[] = [];
          var results: AxiosResponse<Plant>[] = await Promise.all(
            response.data.results.map(
              async (item): Promise => await plantApi.getPlantByIdPlantPlantIdGet(item.plant_id)
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
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      setPlantDataLoaded(true);
    };
    fetchData();
  }, [entryUpdate]);

  function findArrayElementByID(array: Plant[], id: string): Plant {
    const result = array.find((element: Plant) => element.id === id);
    if (result) {
      return result;
    } else {
      return { name: 'Unknown' };
    }
  }

  if (!plantDataLoaded) {
    return <>still loading plant: {plantDataLoaded}</>;
  }
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="stretch" style={{ marginBottom: 8 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ marginBottom: 12 }}>
            My Plant Activity Entries
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {entryData?.results.map((e) => {
            return (
              <ListItem key={e.id}>
                <ListItemIcon>{ratingIcons[e.plant_health].icon}</ListItemIcon>
                <ListItemButton component="a" href={'/entry/' + e.id}>
                  <ListItemText
                    primary={
                      findArrayElementByID(plantData, e.plant_id).name +
                      ': ' +
                      findArrayElementByID(plantData, e.plant_id).common_name
                    }
                    secondary={e.activities.map((a) => a.name).join(', ') + ' at ' + e.timestamp}
                  />
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
