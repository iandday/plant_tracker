import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityApi, EntryApi } from '../services';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Button, ButtonGroup, Card, CardMedia, Grid, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Helmet } from 'react-helmet-async';
import { EntryOut } from '../services/models/entry-out';
import { ActivityOut } from '../services/models/activity-out';

type editParams = {
  id: string;
};

const EntryDetail = () => {
  const { id = 'none' } = useParams<editParams>();
  const api = new EntryApi(undefined, BASE_PATH, axiosInstance);
  const activityApi = new ActivityApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState<EntryOut>();
  const [activityData, setActivityData] = useState<ActivityOut[]>();

  // get activity details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewEntryGetEntry(id);
        if (response.status === 200) {
          setEntryData(response.data);
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

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied'
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied'
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral'
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied'
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied'
    }
  };

  const navigate = useNavigate();

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Plant Detail'}</title>
      </Helmet>
      {activityData ? (
        <Typography variant="h4" align="center">
          {entryData?.activities
            .map((a) => {
              let match = activityData.find((act) => act.id === a);
              return match!.name;
            })
            .join(', ')}
        </Typography>
      ) : null}
      <Grid container justifyContent="space-between" alignItems="stretch" columns={{ xs: 2, sm: 3, md: 2 }}>
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Notes: {entryData?.notes}</Typography>
          <Typography variant="body1" marginLeft={2}></Typography>
          <Typography variant="button">
            Health: {customIcons[String(entryData!.plant_health)].icon}{' '}
            {customIcons[String(entryData!.plant_health)].label}
          </Typography>
          <Typography variant="body1" marginLeft={2}></Typography>
          <Typography variant="button">Timestamp: {entryData?.Timestamp}</Typography>
        </Grid>
        {entryData?.photo ? (
          <Grid item marginRight={2}>
            <Card sx={{ maxWidth: 150 }}>
              <CardMedia
                component={'img'}
                src={`${import.meta.env.VITE_BACKEND_URL}/${entryData.photo}`}
                sx={{ height: 240 }}
              />
            </Card>
          </Grid>
        ) : null}
      </Grid>
      <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
        <Button
          sx={{ color: 'primary' }}
          onClick={() => {
            navigate(`/myPlants/${entryData!.plant}`);
          }}
        >
          Back to Plant Detail
        </Button>
        <Button
          sx={{ color: 'primary' }}
          onClick={() => {
            api.trackerApiViewEntryDeleteEntry(entryData!.id!);
            navigate(`/myPlants/${entryData!.plant}`);
          }}
        >
          Delete Entry
        </Button>
      </ButtonGroup>
    </>
  );
};

export default EntryDetail;
