import {
  Avatar,
  Button,
  ButtonGroup,
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
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ActivityApi, AreaApi, AreaOut, EntryApi, PlantApi, PlantOut } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Helmet } from 'react-helmet-async';
import flower from '../flower.jpg';
import { EntryOut } from '../services/models/entry-out';
import { ActivityOut } from '../services/models/activity-out';
import dayjs from 'dayjs';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ratingIcons } from '../components/ratings';

const PlantDetail = () => {
  const { id } = useParams();
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const entryApi = new EntryApi(undefined, BASE_PATH, axiosInstance);
  const activityApi = new ActivityApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<AreaOut>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [entryData, setEntryData] = useState<EntryOut[]>();
  const [activityData, setActivityData] = useState<ActivityOut[]>();

  // get plant details and then area details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewPlantGetPlant(id!);
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const locResponse = await areaApi.trackerApiViewAreaGetArea(response.data.area!);
        if (locResponse.status === 200) {
          setAreaData(locResponse.data);
        }
        const entryResponse = await entryApi.trackerApiViewEntryGetPlantEntries(id!);
        if (entryResponse.status === 200) {
          setEntryData(entryResponse.data);
        }
        const activityResponse = await activityApi.trackerApiViewActivityListActivities();
        if (activityResponse.status === 200) {
          setActivityData(activityResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  // start reference menu item

  const anchorRef = React.useRef<HTMLDivElement>(null);

  // end reference menu item

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | ' + plantData?.name}</title>
      </Helmet>
      <Typography variant="h4" align="center">
        {plantData?.name}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="stretch" columns={{ xs: 2, sm: 3, md: 2 }}>
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Common Name:</Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.common_name}
          </Typography>
          <Typography variant="button">Scientific Name: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.scientific_name}
          </Typography>
          <Typography variant="button">Area: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {areaData?.name}
          </Typography>
          <Typography variant="button">Notes: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.notes === 'null' ? 'None' : plantData?.notes}
          </Typography>
          <Typography variant="button">Purchase Date: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.purchase_date}
          </Typography>
          {plantData?.death_date ? (
            <>
              <Typography variant="button">Death Date: </Typography>
              <Typography variant="body1" marginLeft={2}>
                {plantData?.death_date}
              </Typography>
            </>
          ) : null}
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button
              onClick={() => {
                navigate(`/editPlant/${plantData?.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                navigate(`/newEntry/${plantData?.id}`);
              }}
            >
              Add Activity Entry
            </Button>
            <Button
              onClick={() => {
                api.trackerApiViewPlantPostPlant(
                  id!,
                  undefined,
                  undefined,
                  true,
                  dayjs().format('YYYY-MM-DD'),
                  undefined,
                  undefined,
                  undefined,
                  undefined
                );
                navigate(`/myPlants}`);
              }}
            >
              Send to Graveyard
            </Button>
            <Button
              onClick={() => {
                api.trackerApiViewPlantDeletePlant(plantData?.id!);
                navigate(`/myPlants}`);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item marginRight={2}>
          <Card sx={{ maxWidth: 150 }}>
            {plantData?.main_photo ? (
              <CardMedia
                component={'img'}
                src={`${import.meta.env.VITE_BACKEND_URL}/${plantData?.main_photo}`}
                sx={{ height: 240 }}
              />
            ) : (
              <CardMedia component={'img'} src={flower} sx={{ height: 240 }} />
            )}
          </Card>
        </Grid>
      </Grid>
      {entryData && activityData && entryData.length > 0 ? (
        <>
          <Typography variant="h6" marginLeft={2}>
            Activity Entries
          </Typography>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems={'stretch'} flexGrow={1}>
            {' '}
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
                        title={plantData!.name}
                        subheader={plantData!.common_name}
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
      ) : null}
      ;
    </>
  );
};

export default PlantDetail;
