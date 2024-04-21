import { Button, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AreaApi, AreaOut, PlantApi } from '../services';
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
    main_photo: File;
    notes: string;
  }
  const {
    //register: newRegister,
    handleSubmit: newHandleSubmit,
    //reset: newReset,
    control: newControl,
    setValue: newSetValue
  } = useForm<PlantFormIn>({
    defaultValues: {
      purchase_date: dayjs(),
      area_id: undefined,
      name: undefined,
      common_name: undefined,
      scientific_name: undefined,
      notes: undefined
    }
  });

  const newOnSubmit = async (data: PlantFormIn) => {
    try {
      const response = await plantAPI.trackerApiViewPlantCreatePlant(
        data.area_id,
        data.name,
        data.purchase_date.format('YYYY-MM-DD'),
        undefined,
        undefined,
        data.common_name,
        data.scientific_name,
        data.notes,
        data.main_photo
      );
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
              <InputLabel id="demo-simple-select-helper-label">Area</InputLabel>
              <Controller
                control={newControl}
                name="area_id"
                render={({ field: { onChange, value } }) => (
                  <Select id="area" value={value} onChange={onChange} label="Area">
                    {areaData?.map((area) => <MenuItem value={area.id}>{area.name}</MenuItem>)}
                  </Select>
                )}
              />
              <Controller
                control={newControl}
                name="notes"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    variant="filled"
                    label="Notes"
                    value={value || ''}
                    fullWidth
                    multiline
                    rows={4}
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
              <Controller
                control={newControl}
                name="main_photo"
                rules={{ required: false }}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <Input
                      {...field}
                      onChange={(event) => {
                        let file = (event.target as HTMLInputElement)!.files![0];
                        onChange(file);
                        newSetValue('main_photo', file);
                      }}
                      type="file"
                      id="picture"
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
