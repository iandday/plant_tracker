import {
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  LocationApi,
  LocationReturn,
  PlantApi,
  PlantCreateTrefle,
  PlantSearchResultsTrefle,
  PlantSearchTrefle,
  TrefleApi
} from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';

const NewPlant = () => {
  const api = new TrefleApi(null, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<PlantSearchResultsTrefle[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Number>();

  const locationAPI = new LocationApi(null, BASE_PATH, axiosInstance);
  const [locationUpdate, setlocationUpdate] = useState<number>(0);
  const [locationData, setLocationData] = useState<LocationReturn>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //const response = await APIClient.get(`/location`);
        const response = await locationAPI.getLocationsLocationGet();
        if (response.status === 200) {
          setLocationData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [locationUpdate]);

  const onSubmit = async (data: PlantSearchTrefle) => {
    try {
      const response = await api.searchPlantTreflePlantTrefleSearchPost({ ...data });
      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const newOnSubmit = async (data: PlantCreateTrefle) => {
    try {
      const response = await api.createPlantTreflePlantTrefleCreatePost({
        ...data
      });
      if (response.status === 200) {
        console.log(response.data.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const { register, handleSubmit, reset, control, setValue } = useForm<PlantSearchTrefle>({
    defaultValues: {}
  });

  const {
    register: newRegister,
    handleSubmit: newHandleSubmit,
    reset: newReset,
    control: newControl,
    setValue: newSetValue
  } = useForm<PlantCreateTrefle>({
    defaultValues: {}
  });

  return (
    <>
      <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            New Plant
          </Typography>
        </Grid>
      </Grid>
      {searchResults.length < 1 && !selectedPlant ? (
        <Grid item xs={12} alignItems="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} justifyContent="flex-start">
                <Controller
                  name="query"
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      variant="filled"
                      label="Search"
                      value={value}
                      fullWidth
                    />
                  )}
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : null}
      {searchResults.length > 0 && !selectedPlant ? (
        <>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12}>
              <Typography align="center">Click on your plant to add it to your collection</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {searchResults?.map((value) => {
              return (
                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                  <Card>
                    <CardActionArea
                      onClick={() => {
                        setSelectedPlant(value.id);
                      }}
                    >
                      <CardMedia sx={{ height: 140, width: 300 }} image={value.photo_url} title="green iguana" />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {value.common_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.scientific_name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        href={`http://trefle.io/explore/species/${value.scientific_name
                          .replace(' ', '-')
                          .toLowerCase()}`}
                        target="_blank"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : null}
      {selectedPlant ? (
        <Grid item xs={12} alignItems="center">
          <form onSubmit={newHandleSubmit(newOnSubmit)}>
            <Grid container>
              <Grid item xs={12} justifyContent="flex-start">
                <Controller
                  name="name"
                  control={newControl}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      variant="filled"
                      label="Name"
                      value={value}
                      fullWidth
                    />
                  )}
                />

                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : null}
      {/* try automcomplete here */}
    </>
  );
};

export default NewPlant;
