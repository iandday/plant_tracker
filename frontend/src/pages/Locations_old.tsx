import {
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { API } from "../config/api";
import React, { useEffect, useState } from "react";
import usePlantAPI, {
  IDList,
  LocationList,
  NewLocation,
} from "../hooks/usePlantAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

const Locations = () => {
  const [updateData, setUpdateData] = useState<NewLocation | false>(false);

  const {
    sendData: update_sendData,
    response: update_response,
    responseCode: update_responseCode,
    loading: update_isLoading,
  } = usePlantAPI({
    method: "post",
    url: "/location",
    data: updateData,
  });

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = selectedLocations.findIndex((obj) => obj === value);
    const newChecked: string[] = [...selectedLocations];

    if (currentIndex === -1) {
      newChecked.push(value);
      setSelectedLocations(newChecked);
    } else {
      setSelectedLocations((selectedLocations) =>
        selectedLocations.filter((data) => data !== value)
      );
    }
  };

  const deleteLocation = async (loc: string) => {
    await axios.delete(`${API}/location/${loc}`);
  };

  const { response: data, sendData: updateLocationList } =
    usePlantAPI<LocationList>(
      {
        method: "get",
        url: `/location`,
      },
      []
    );

  const handleDelete = async () => {
    selectedLocations.map((loc) => {
      deleteLocation(loc);
      updateLocationList;
    });
    setSelectedLocations([]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewLocation>();

  // send location to backend
  const onSubmit: SubmitHandler<NewLocation> = (data: NewLocation) => {
    setUpdateData(data);
  };

  useEffect(() => {
    // only run when data is available
    if (updateData) {
      update_sendData();
      reset();
      setUpdateData(false);
    }
  }, [updateData]);

  // update after delete
  useEffect(() => {
    updateLocationList();
  }, [deleteLocation]);

  // load at startup and when navigating from other routes
  useEffect(() => {
    updateLocationList();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        //alignItems="stretch"
        style={{ marginBottom: 1 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Locations
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <List
            //dense
            sx={{
              //width: "100%",
              //maxWidth: 300,
              bgcolor: "background.paper",
              mt: 2,
            }}
          >
            {data?.results.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.id}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.id)}
                      checked={
                        selectedLocations.findIndex(
                          (obj) => obj === value.id
                        ) !== -1
                      }
                      inputProps={{ "aria-labelledby": labelId }}
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
          {selectedLocations.length >= 1 ? (
            <Button
              sx={{ color: "warning.main", pt: 1, mt: 2 }}
              variant="contained"
              onClick={handleDelete}
            >
              Delete Selected Locations
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ pt: 5 }}
        >
          <Grid item xs={8}>
            <TextField
              fullWidth
              required
              id="name"
              label="Add New Location"
              type="filled"
              {...register("name")}
              error={errors.name ? true : false}
              sx={{ pt: 5 }}
            />
          </Grid>
          <Grid item xs={4} direction="column">
            <Stack sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ color: "text.primary", pt: 0, pb: 0 }}
              >
                Submit
              </Button>
              <Button
                sx={{ color: "warning.main", pt: 0, pb: 0, mt: 1 }}
                variant="contained"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Locations;
