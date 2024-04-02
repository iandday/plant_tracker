import {
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  Autocomplete
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { AreaApi, LocationApi, AreaOut, LocationOut, AreaIn } from '../services/index';

import LabelBottomNavigation from '../components/Navigation';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Helmet } from 'react-helmet-async';

const Areas = () => {
  const api = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const locationApi = new LocationApi(undefined, BASE_PATH, axiosInstance);
  const [areaUpdate, setareaUpdate] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<AreaOut[]>();
  const [locationData, setLocationData] = useState<LocationOut[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewAreaListAreas();
        if (response.status === 200) {
          setAreaData(response.data);
          try {
            const locResponse = await locationApi.trackerApiViewLocationListLocations();
            if (locResponse.status === 200) {
              setLocationData(locResponse.data);
            }
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [areaUpdate]);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>();

  interface areaEditForm {
    name: string;
    location_id: string;
    id: string;
  }
  // edit area form
  const {
    //register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    control: editControl
    //setValue: editSetValue
  } = useForm<areaEditForm>();

  // create area form
  const {
    //register,
    handleSubmit,
    reset,
    control
    //setValue
  } = useForm<AreaIn>({
    defaultValues: { name: '', location_id: '' }
  });
  const onSubmit = async (data: AreaIn) => {
    try {
      const response = await api.trackerApiViewAreaCreateArea({ name: data.name, location_id: data.location_id });
      if (response.status === 200) {
        setareaUpdate(areaUpdate + 1);
        setShowNew((oldValue) => !oldValue);
      }
    } catch (err: any) {
      setAlertText(err.response.data.detail);
      setShowAlert((oldValue) => !oldValue);
    }
  };

  // start selected areas
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const handleToggle = (value: string) => () => {
    const currentIndex = selectedAreas.findIndex((obj) => obj === value);
    const newChecked: string[] = [...selectedAreas];

    if (currentIndex === -1) {
      newChecked.push(value);
      setSelectedAreas(newChecked);
    } else {
      setSelectedAreas((selectedAreas) => selectedAreas.filter((data) => data !== value));
    }
  };
  // end selected areas

  // populate edit form with area name based on area ID
  useEffect(() => {
    if (selectedAreas.length == 1) {
      if (areaData) {
        var area = areaData.filter((loc: AreaOut) => loc.id === selectedAreas[0]);
        console.log(area[0].location.id);
        editReset({ name: area[0].name, location_id: area[0].location.id, id: area[0].id });
      }
    }
  }, [selectedAreas]);

  // delete function
  const handleDelete = async () => {
    selectedAreas.map(async (loc) => {
      try {
        const response = await api.trackerApiViewAreaDeleteArea(loc);
        if (response.status === 200) {
          setareaUpdate(areaUpdate + 1);
        }
      } catch (err) {
        console.error(err);
      }
      setSelectedAreas(selectedAreas.filter((data) => data !== loc));
    });
  };

  // edit function
  const editOnSubmit = async (data: areaEditForm) => {
    try {
      const response = await api.areaPatchArea(data.id, {
        name: data.name,
        location_id: data.location_id
      });

      if (response.status === 200) {
        setareaUpdate(areaUpdate + 1);
        setShowEdit((oldValue) => !oldValue);
        setSelectedAreas([]);
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
        <title>{import.meta.env.VITE_APP_NAME + ' | Areas'}</title>
      </Helmet>
      <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Areas</Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <List
            sx={{
              bgcolor: 'background.paper',
              mt: 2
            }}
          >
            {areaData?.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.id}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.id)}
                      checked={selectedAreas.findIndex((obj) => obj === value.id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText id={value.id} primary={value.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          {selectedAreas.length == 1 ? (
            <Button
              variant="contained"
              onClick={() => {
                setShowEdit((oldValue) => !oldValue);
              }}
            >
              Edit
            </Button>
          ) : null}
          {selectedAreas.length != 0 ? (
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          ) : null}

          <Button
            onClick={() => {
              setShowNew((oldValue) => !oldValue);
            }}
            variant="contained"
            color="success"
          >
            New
          </Button>

          {showEdit ? (
            <form onSubmit={editHandleSubmit(() => editOnSubmit)} onReset={() => editReset}>
              <Grid container>
                <Grid item xs={7} justifyContent="flex-start">
                  <Controller
                    name="name"
                    control={editControl}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="Edit"
                        fullWidth
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="location_id"
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        id="location_id"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={locationData!}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, data) => {
                          onChange(data?.id);
                          console.log(event);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Location" />}
                      />
                    )}
                  />
                  <Controller
                    name="id"
                    control={editControl}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="Edit"
                        fullWidth
                        value={value}
                        style={{ display: 'none' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={5} justifyContent="flex-end">
                  <ButtonGroup orientation="horizontal">
                    <Button type="submit" variant="contained" sx={{ mt: 0 }}>
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        editReset;
                      }}
                      sx={{ mt: 0 }}
                    >
                      Reset
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          ) : null}
        </Grid>
        <Grid item xs={12} justifyContent="flex-end"></Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          {showNew ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={7} justifyContent="flex-start">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="New Area"
                        value={value}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="location_id"
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        id="location_id"
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={locationData!}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, data: LocationOut | null) => {
                          onChange(data?.id);
                          console.log(event);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Location" />}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={5} justifyContent="flex-end">
                  <ButtonGroup orientation="horizontal">
                    <Button type="submit" variant="contained" sx={{ mt: 0 }}>
                      Submit
                    </Button>
                    <Button variant="contained" onClick={() => reset} sx={{ mt: 0 }}>
                      Reset
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          ) : null}
        </Grid>
        {showAlert ? (
          <Alert
            severity="error"
            onClose={() => {
              setShowAlert((oldValue) => !oldValue);
              reset();
            }}
          >
            <AlertTitle>Error</AlertTitle>
            <strong>{alertText}</strong>
          </Alert>
        ) : null}
      </Grid>
      <LabelBottomNavigation />
    </>
  );
};

export default Areas;
