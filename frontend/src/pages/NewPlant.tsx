import {
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  AreaApi,
  AreaReturn,
  PlantCreateTrefle,
  PlantSearchResultsTrefle,
  PlantSearchTrefle,
  TrefleApi
} from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface int_NewPlantForm {
  id: Number;
  purchase_date: Dayjs;
  area: string;
  name: string;
}
const NewPlant = () => {
  const navigate = useNavigate();

  const api = new TrefleApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<PlantSearchResultsTrefle[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Number>();

  const areaAPI = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaReturn>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await areaAPI.getAreasAreaGet();
        if (response.status === 200) {
          setAreaData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const {
    //register,
    handleSubmit,
    //reset,
    control
    //setValue
  } = useForm<PlantSearchTrefle>({
    defaultValues: { query: '' }
  });

  const {
    //register: newRegister,
    handleSubmit: newHandleSubmit,
    //reset: newReset,
    control: newControl
    //setValue: newSetValue
  } = useForm<int_NewPlantForm>({
    defaultValues: {
      id: Number(selectedPlant),
      purchase_date: dayjs(),
      area: undefined,
      name: undefined
    }
  });

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

  const newOnSubmit = async (data: int_NewPlantForm) => {
    try {
      const createData: PlantCreateTrefle = {
        id: Number(selectedPlant),
        name: data.name,
        area: data.area,
        purchase_date: data.purchase_date.format('YYYY-MM-DD')
      };
      const response = await api.createPlantTreflePlantTrefleCreatePost({
        ...createData
      });
      if (response.status === 200) {
        navigate(`/myPlants/${response.data.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | New Plant'}</title>
      </Helmet>
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
                  render={({ field: { onChange, onBlur, value } }) => (
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
                <Grid item xs display="flex" justifyContent="center" alignItems="center" key={value.id}>
                  <Card>
                    <CardActionArea
                      onClick={() => {
                        setSelectedPlant(value.id);
                      }}
                    >
                      <CardMedia sx={{ height: 140, width: 300 }} image={value.photo_url!} title="plant image" />
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      variant="filled"
                      label="Name"
                      value={value || ''}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={newControl}
                  name="area"
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      id="area"
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={areaData!.results}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) => {
                        onChange(data?.id);
                        console.log(event);
                      }}
                      renderInput={(params) => <TextField {...params} variant="outlined" label="Area" />}
                    />
                  )}
                />
                <Controller
                  control={newControl}
                  name="purchase_date"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        label="purchase_date"
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(date) => {
                          field.onChange(dayjs(date));
                        }}
                      />
                    );
                  }}
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : null}
    </>
  );
};

export default NewPlant;
