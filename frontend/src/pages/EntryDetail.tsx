import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entry, EntryApi } from '../services';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Helmet } from 'react-helmet-async';

type editParams = {
  id: string;
};

const EntryDetail = () => {
  const { id = 'none' } = useParams<editParams>();
  const api = new EntryApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState<Entry>();

  // get activity details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getEntryEntryEntryIdGet(id);
        if (response.status === 200) {
          setEntryData(response.data);
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
      <Typography variant="h4" align="center">
        {entryData?.activities.map((a) => a.name).join(', ')}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="stretch" columns={{ xs: 2, sm: 3, md: 2 }}>
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Notes: {entryData?.notes}</Typography>
          <Typography variant="body1" marginLeft={2}></Typography>
          <Typography variant="button">
            Health: {customIcons[String(entryData!.plant_health)].icon}{' '}
            {customIcons[String(entryData!.plant_health)].label}
          </Typography>
          <Typography variant="body1" marginLeft={2}></Typography>
          <Typography variant="button">Timestamp: {entryData?.timestamp}</Typography>
        </Grid>
      </Grid>
      <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
        <Button
          sx={{ color: 'primary' }}
          onClick={() => {
            navigate(`/myPlants/${entryData!.plant_id}`);
          }}
        >
          Back to Plant Detail
        </Button>
        <Button
          sx={{ color: 'primary' }}
          onClick={() => {
            api.deleteEntryEntryEntryIdDelete(entryData!.id);
            navigate(`/myPlants/${entryData!.plant_id}`);
          }}
        >
          Delete Entry
        </Button>
      </ButtonGroup>
    </>
  );
};

export default EntryDetail;
