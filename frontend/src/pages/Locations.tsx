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
import React, { useEffect, useState } from "react";
import usePlantAPI, {
  IDList,
  LocationList,
  NewLocation,
} from "../hooks/usePlantAPI";
import { useForm, SubmitHandler } from "react-hook-form";

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
  const [deleteData, setDeleteData] = useState<string>("");
  const {
    sendData: delete_sendData,
    response: delete_response,
    responseCode: delete_responseCode,
    loading: delete_isLoading,
  } = usePlantAPI({
    method: "delete",
    url: `/location/${deleteData}`,
  });

  const { response: data, sendData: updateLocationList } =
    usePlantAPI<LocationList>(
      {
        method: "get",
        url: `/location`,
      },
      [update_response, delete_response]
    );

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
    }
  }, [updateData]);

  useEffect(() => {
    // only run when data is available
    if (deleteData) {
      console.log("Delete Called");
      delete_sendData();
    }
  }, [deleteData]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        style={{ marginBottom: 8 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Locations
          </Typography>
        </Grid>
      </Grid>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
                    selectedLocations.findIndex((obj) => obj === value.id) !==
                    -1
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
      ------ checked: {JSON.stringify(selectedLocations)} end
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Stack>
              <TextField
                required
                id="name"
                label="Name"
                type="filled"
                {...register("name")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />
              <ButtonGroup
                variant="contained"
                sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}
              >
                <Button type="submit" sx={{ color: "text.primary" }}>
                  Submit
                </Button>
                <Button
                  sx={{ color: "warning.main" }}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </Button>
                <Button
                  sx={{ color: "warning.main" }}
                  onClick={() => {
                    selectedLocations.map((loc) => {
                      console.log(`Deleting ${loc}`);
                      setDeleteData(loc);
                      handleToggle(loc);
                    });
                  }}
                >
                  Delete Locations
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Locations;
