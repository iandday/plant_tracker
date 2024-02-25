import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { AreaApi, AreaReturn, Plant, PlantApi, PlantPatch } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';

const EditPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const api = new PlantApi(null, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [plantData, setPlantData] = useState<Plant>();
  const [plantUpdate, setPlantUpdate] = useState<number>(0);

  const areaAPI = new AreaApi(null, BASE_PATH, axiosInstance);
  const [areaUpdate, setareaUpdate] = useState<number>(0);
  const [areaData, setAreaData] = useState<AreaReturn>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getPlantByIdPlantPlantIdGet(id);

        if (response.status === 200) {
          setPlantData(response.data);
          const locResponse = await areaAPI.getAreasAreaGet();
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

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<PlantPatch>({
    defaultValues: { ...plantData }
  });
  const onSubmit = async (data: PlantPatch) => {
    try {
      const response = await api.updatePlantPlantPlantIdPatch(id, { ...data });
      if (response.status === 200) {
        navigate(`/myPlants/${id}`);
      }
    } catch (err: AxiosError) {
      console.log(err);
    }
  };

  return (
    <>
      {plantData && !loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={0} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item>
              <Stack>
                <TextField
                  required
                  id="name"
                  label="Name"
                  type="filled"
                  {...register('name')}
                  error={errors.name ? true : false}
                  sx={{ pt: 5 }}
                />
                <TextField
                  fullWidth
                  required
                  id="common_name"
                  label="Common Name"
                  type="filled"
                  {...register('common_name')}
                  error={errors.name ? true : false}
                  sx={{ pt: 5 }}
                />
                <TextField
                  fullWidth
                  required
                  id="scientific_name"
                  label="Scientific Name"
                  type="filled"
                  {...register('scientific_name')}
                  error={errors.name ? true : false}
                  sx={{ pt: 5 }}
                />
                <Controller
                  control={control}
                  name="area"
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="area_id"
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      options={areaData.results}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, data) => {
                        onChange(data?.id);
                      }}
                      defaultValue={areaData.results.find((loc) => loc.id === plantData.area_id)}
                      renderInput={(params) => <TextField {...params} variant="outlined" label="Area" />}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="purchase_date"
                  label="Purchase Date"
                  type="date"
                  {...register('purchase_date')}
                  error={errors.name ? true : false}
                  sx={{ pt: 5 }}
                />

                <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
                  <Button type="submit" sx={{ color: 'text.primary' }}>
                    Submit
                  </Button>
                  <Button
                    sx={{ color: 'warning.main' }}
                    onClick={() => {
                      reset({ ...plantData });
                    }}
                  >
                    Reset
                  </Button>
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
      ) : null}
    </>
  );
};

export default EditPlant;
