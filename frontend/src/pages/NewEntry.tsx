import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActivityApi,
  ActivityReturn,
  EntryApi,
  EntryCreate,
  LocationReturn,
  Plant,
  PlantApi,
  PlantPatch
} from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Controller, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const NewEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const activityAPI = new ActivityApi(null, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [activityUpdate, setActivityUpdate] = useState<number>(0);
  const [activityData, setActivityData] = useState<ActivityReturn>([]);

  const entryAPI = new EntryApi(null, BASE_PATH, axiosInstance);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await activityAPI.getActivitysActivityGet();

        if (response.status === 200) {
          setActivityData(response.data);
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  interface EntryCreateForm {
    plant_id: string;
    timestamp: Dayjs;
    notes: string;
    activities: [string];
    plant_health: number;
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<EntryCreateForm>({
    defaultValues: { plant_id: id, timestamp: dayjs(new Date()) }
  });
  const onSubmit = async (data: EntryCreateForm) => {
    try {
      const formData: EntryCreate = {
        plant_id: id,
        notes: data.notes,
        activities: data.activities,
        timestamp: data.timestamp.toISOString(),
        plant_health: data.plant_health
      };
      console.log(formData);
      const response = await entryAPI.createEntryEntryPost({ ...formData });
      if (response.status === 200) {
        navigate(`/myPlants/${id}`);
      }
    } catch (err: AxiosError) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            New Activity Entry
          </Typography>
        </Grid>
      </Grid>
      {activityData && !loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} m={2} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item>
              <Stack pb={3} pt={3}>
                <Controller
                  control={control}
                  name="timestamp"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <DateTimePicker
                        label="Timestamp"
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
                  name="notes"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      variant="filled"
                      label="Notes"
                      value={value || ''}
                      multiline
                      maxRows={6}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="activities"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => (
                    <Select
                      label="Activities"
                      multiple
                      value={value || []}
                      onChange={onChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Activities" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={activityData.results.find((o) => o.id === value).name} />
                          ))}
                        </Box>
                      )}
                    >
                      {activityData.results.map((activity) => (
                        <MenuItem key={activity.name} value={activity.id}>
                          {activity.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="plant_health"
                  control={control}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => (
                    <Select label="Plant Health" value={value || 0} onChange={onChange}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>1</MenuItem>
                    </Select>
                  )}
                />
                <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
                  <Button type="submit" sx={{ color: 'text.primary' }}>
                    Submit
                  </Button>
                  <Button
                    sx={{ color: 'warning.main' }}
                    onClick={() => {
                      reset({ plant_id: id, timestamp: dayjs(new Date()) });
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

export default NewEntry;
