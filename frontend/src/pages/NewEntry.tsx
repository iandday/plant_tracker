import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityApi, EntryApi, PlantApi, PlantOut } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Helmet } from 'react-helmet-async';
import { ActivityOut } from '../services/models/activity-out';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled
  }
}));

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

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const NewEntry = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const activityAPI = new ActivityApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<ActivityOut[]>();
  const [plantData, setPlantData] = useState<PlantOut>();
  const [allPlantData, setAllPlantData] = useState<PlantOut[]>();
  const entryAPI = new EntryApi(undefined, BASE_PATH, axiosInstance);
  const plantAPI = new PlantApi(undefined, BASE_PATH, axiosInstance);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await activityAPI.trackerApiViewActivityListActivities();

        if (response.status === 200) {
          setActivityData(response.data);
          const presponse = await plantAPI.trackerApiViewPlantGetPlant(id);
          if (presponse.status === 200) {
            setPlantData(presponse.data);
          }
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlantData = async () => {
      setLoading(true);
      try {
        const response = await plantAPI.trackerApiViewPlantListPlants();
        if (response.status === 200) {
          setAllPlantData(response.data);
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchPlantData();
  }, []);

  interface EntryCreateForm {
    plant_id: string;
    timestamp: Dayjs;
    notes: string;
    activities: [string];
    plant_health: number;
    photo: File;
  }

  const {
    //register,
    handleSubmit,
    reset,
    control,
    setValue
    //formState: { errors }
  } = useForm<EntryCreateForm>({
    defaultValues: { plant_id: id, timestamp: dayjs(new Date()), plant_health: 5, activities: [], notes: '' }
  });
  const onSubmit = async (data: EntryCreateForm) => {
    try {
      const response = await entryAPI.trackerApiViewEntryCreateEntry(
        data.timestamp.toISOString(),
        data.activities,
        id,
        data.notes,
        data.plant_health,
        data.photo
      );

      if (response.status === 200) {
        navigate(`/myPlants/${id}`);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  //const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(1);

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | New Entry'}</title>
      </Helmet>
      <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            New Activity Entry {id ? ' for ' + plantData?.name : null}
          </Typography>
        </Grid>
      </Grid>
      {activityData && allPlantData && !loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} m={2} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item>
              <Stack pb={3} pt={3}>
                <label>Plant</label>
                <Controller
                  name="plant_id"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <NativeSelect value={value || []} onChange={onChange} input={<OutlinedInput label="Plant" />}>
                      {allPlantData.map((plant) => (
                        <option key={plant.name} value={plant.id}>
                          {plant.name}
                        </option>
                      ))}
                    </NativeSelect>
                  )}
                />
                <label>Timestamp</label>
                <Controller
                  control={control}
                  name="timestamp"
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <DateTimePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(date) => {
                          field.onChange(dayjs(date));
                        }}
                      />
                    );
                  }}
                />
                <label>Activities</label>
                <Controller
                  name="activities"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="Activities"
                      multiple
                      value={value || []}
                      onChange={onChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Activities" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={activityData.find((o) => o.id === value)!.name} />
                          ))}
                        </Box>
                      )}
                    >
                      {activityData.map((activity) => (
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
                  render={({ field: { onChange, value } }) => (
                    <>
                      <FormLabel>Plant Health</FormLabel>
                      <StyledRating
                        name="highlight-selected-only"
                        defaultValue={5}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                        value={value || 5}
                        onChange={onChange}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                          console.log(event);
                        }}
                      />
                      <Box sx={{ ml: 2 }}>{customIcons[hover !== 1 && hover !== -1 ? hover : value].label}</Box>
                    </>
                  )}
                />
                <label>Notes</label>
                <Controller
                  name="notes"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      variant="filled"
                      value={value || ''}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="photo"
                  rules={{ required: false }}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <Input
                        {...field}
                        onChange={(event) => {
                          let file = (event.target as HTMLInputElement)!.files![0];
                          onChange(file);
                          setValue('photo', file);
                        }}
                        type="file"
                        id="picture"
                      />
                    );
                  }}
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
