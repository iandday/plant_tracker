import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AreaApi, AreaOut, PlantApi, PlantOut, PlantPatch } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Helmet } from 'react-helmet-async';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

type editParams = {
  id: string;
};

const EditPlant = () => {
  const { id = 'none' } = useParams<editParams>();
  const navigate = useNavigate();

  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [plantData, setPlantData] = useState<PlantOut>();

  const areaAPI = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [areaData, setAreaData] = useState<AreaOut[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewPlantGetPlant(id);
        if (response.status === 200) {
          setPlantData(response.data);
          const locResponse = await areaAPI.trackerApiViewAreaListAreas();
          if (locResponse.status === 200) {
            setAreaData(locResponse.data);
            reset({ ...response.data });
          }
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  interface PlantPatchIn {
    name: string;
    common_name: string;
    scientific_name: string;
    p_date: Dayjs;
    graveyard: boolean | null;
    death_date: string | null;
    area_id: string;
  }

  const {
    //register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<PlantPatchIn>({
    defaultValues: {
      p_date: dayjs(plantData?.purchase_date, 'YYYY-MM-DD'),
      area_id: plantData?.area_id,
      name: plantData?.name,
      common_name: plantData?.common_name,
      scientific_name: plantData?.scientific_name
    }
  });
  //CANT POPULATE AREA

  const onSubmit = async (data: PlantPatchIn) => {
    try {
      const patchData: PlantPatch = {
        name: data.name,
        common_name: data.common_name,
        scientific_name: data.scientific_name,
        purchase_date: data.p_date.format('YYYY-MM-DD'),
        graveyard: data.graveyard,
        death_date: data.death_date,
        area_id: data.area_id
      };
      const response = await api.trackerApiViewPlantPatchPlant(id, { ...patchData });
      if (response.status === 200) {
        navigate(`/myPlants/${id}`);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Edit Plant'}</title>
      </Helmet>
      //{' '}
      {true && !loading ? (
        <>
          <Typography variant="h4" align="center">
            edot
            {/* Edit // {plantData?.name} */}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
              <Grid item>
                <Stack>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        required
                        id="name"
                        label="Name"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.name ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />
                  <Controller
                    name="common_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        fullWidth
                        required
                        id="common_name"
                        label="Common Name"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.name ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />
                  <Controller
                    name="scientific_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        fullWidth
                        required
                        id="scientific_name"
                        label="Scientific Name"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.name ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="area_id"
                    render={({ field: { onChange, value } }) => (
                      <Select id="area" value={value} onChange={onChange}>
                        {areaData?.map((area) => <MenuItem value={area.id}>{area.name}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <Controller
                    control={control}
                    name="p_date"
                    rules={{ required: true }}
                    defaultValue={dayjs(plantData?.purchase_date, 'YYYY-MM-DD')}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          label="Purchase Date"
                          value={field.value}
                          inputRef={field.ref}
                          onChange={(date) => {
                            field.onChange(dayjs(date));
                          }}
                        />
                      );
                    }}
                  />

                  <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
                    <Button type="submit" sx={{ color: 'text.primary' }}>
                      Submit
                    </Button>
                    {/* <Button
                      sx={{ color: 'warning.main' }}
                      onClick={() => {
                        reset({
                          name: plantData?.name,
                          common_name: plantData?.common_name,
                          scientific_name: plantData?.scientific_name,
                          purchase_date: plantData?.purchase_date,
                          graveyard: plantData?.graveyard,
                          death_date: plantData?.death_date,
                          area_id: plantData?.area_id
                        });
                      }}
                    >
                      Reset
                    </Button> */}
                    <Button
                      sx={{ color: 'error.main' }}
                      onClick={() => {
                        navigate(`/myPlants/${id}`);
                      }}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </>
      ) : null}
    </>
  );
};

export default EditPlant;
