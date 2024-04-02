import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AreaApi, AreaOut, PlantApi, PlantIn } from '../services';
import { Controller, useForm } from 'react-hook-form';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NewPlant = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const plantAPI = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaAPI = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaOut[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await areaAPI.trackerApiViewAreaListAreas();
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

  interface PlantFormIn {
    purchase_date: Dayjs;
    area_id: string;
    name: string;
    common_name: string;
    scientific_name: string;
  }
  const {
    //register: newRegister,
    handleSubmit: newHandleSubmit,
    //reset: newReset,
    control: newControl
    //setValue: newSetValue
  } = useForm<PlantFormIn>({
    defaultValues: {
      purchase_date: dayjs(),
      area_id: undefined,
      name: undefined,
      common_name: undefined,
      scientific_name: undefined
    }
  });

  const newOnSubmit = async (data: PlantFormIn) => {
    console.log('in');
    const formData: PlantIn = {
      purchase_date: data.purchase_date.format('YYYYMMDD'),
      area_id: data.area_id,
      name: data.name,
      common_name: data.common_name,
      scientific_name: data.scientific_name
    };
    try {
      const response = await plantAPI.trackerApiViewPlantCreatePlant(formData);
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

      <Grid item xs={12} alignItems="center">
        <form onSubmit={newHandleSubmit(() => newOnSubmit)}>
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
                name="common_name"
                control={newControl}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    variant="filled"
                    label="Common Name"
                    value={value || ''}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="scientific_name"
                control={newControl}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    variant="filled"
                    label="Scientific Name"
                    value={value || ''}
                    fullWidth
                  />
                )}
              />
              <Controller
                control={newControl}
                name="area_id"
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    id="area"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={areaData!}
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
                        field.onChange(dayjs(date).format('YYYYMMDD'));
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
    </>
  );
};

export default NewPlant;
