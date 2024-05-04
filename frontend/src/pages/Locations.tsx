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
  AlertTitle
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LocationApi, LocationIn, LocationOut, LocationPatch } from '../services/index';
import axiosInstance from '../provider/CustomAxios';
import { BASE_PATH } from '../services/base';
import { Helmet } from 'react-helmet-async';

const Locations = () => {
  const api = new LocationApi(undefined, BASE_PATH, axiosInstance);
  const [locationUpdate, setlocationUpdate] = useState<number>(0);

  // make a hook
  const [loading, setLoading] = useState(true);
  const [locationData, setLocationData] = useState<LocationOut[]>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //const response = await APIClient.get(`/location`);
        const response = await api.trackerApiViewLocationListLocations();

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

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>();
  // edit location form

  const {
    //register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    control: editControl
    //setValue: editSetValue
  } = useForm<LocationOut>();

  // create location form
  const {
    //register,
    handleSubmit,
    reset,
    control
    //setValue
  } = useForm<LocationIn>({ defaultValues: { name: '' } });
  const onSubmit = async (data: LocationIn) => {
    try {
      const response = await api.trackerApiViewLocationCreateLocation({ name: data.name });
      if (response.status === 200) {
        setlocationUpdate(locationUpdate + 1);
        setShowNew((oldValue) => !oldValue);
      }
    } catch (err: any) {
      setAlertText(err.response.data.detail);
      setShowAlert((oldValue) => !oldValue);
    }
  };

  // start selected locations
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const handleToggle = (value: string) => () => {
    const currentIndex = selectedLocations.findIndex((obj) => obj === value);
    const newChecked: string[] = [...selectedLocations];

    if (currentIndex === -1) {
      newChecked.push(value);
      setSelectedLocations(newChecked);
    } else {
      setSelectedLocations((selectedLocations) => selectedLocations.filter((data) => data !== value));
    }
  };
  // end selected locations

  // populate edit form with location name based on location ID
  useEffect(() => {
    if (selectedLocations.length == 1) {
      if (locationData) {
        var location = locationData.filter((loc: LocationOut) => loc.id === selectedLocations[0]);
        editReset({ ...location[0] });
      }
    }
  }, [selectedLocations]);

  // delete function
  const handleDelete = async () => {
    selectedLocations.map(async (loc) => {
      try {
        const response = await api.trackerApiViewLocationDeleteLocation(loc);
        if (response.status === 200) {
          setlocationUpdate(locationUpdate + 1);
        }
      } catch (err) {
        console.error(err);
      }
      setSelectedLocations(selectedLocations.filter((data) => data !== loc));
    });
  };

  // edit function
  const editOnSubmit = async (data: LocationOut) => {
    try {
      const patchData: LocationPatch = {
        name: data!.name!
      };
      const response = await api.locationPatchLocation(data.id, patchData);

      if (response.status === 200) {
        setlocationUpdate(locationUpdate + 1);
        setShowEdit((oldValue) => !oldValue);
        setSelectedLocations([]);
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
        <title>{import.meta.env.VITE_APP_NAME + ' | Locations'}</title>
      </Helmet>
      <Grid container justifyContent="space-between" style={{ marginBottom: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Locations</Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <List
            sx={{
              bgcolor: 'background.paper',
              mt: 2
            }}
          >
            {locationData?.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.id}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.id)}
                      checked={selectedLocations.findIndex((obj) => obj === value.id) !== -1}
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
          {selectedLocations.length == 1 ? (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  setShowEdit((oldValue) => !oldValue);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.setItem('defaultLocation', selectedLocations[0]);
                }}
              >
                Make Default
              </Button>
            </>
          ) : null}
          {selectedLocations.length != 0 ? (
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
            <form onSubmit={editHandleSubmit(editOnSubmit)} onReset={() => editReset}>
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
                    <Button variant="contained" onClick={() => reset} sx={{ mt: 0 }}>
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
                        label="New Location"
                        value={value}
                        fullWidth
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
    </>
  );
};

export default Locations;
