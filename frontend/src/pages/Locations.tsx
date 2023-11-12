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
  const { response: locationData, sendData: updateLocationData } =
    usePlantAPI<LocationList>(
      {
        method: "get",
        url: `/location`,
      },
      []
    );

  //   const [updateData, setUpdateData] = useState<NewLocation | false>(false);

  //   const {
  //     sendData: update_sendData,
  //     response: update_response,
  //     responseCode: update_responseCode,
  //     loading: update_isLoading,
  //   } = usePlantAPI({
  //     method: "post",
  //     url: "/location",
  //     data: updateData,
  //   });

  // start selected locations for deletion
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
  // end selected locations for deletion

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        style={{ marginBottom: 1 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Locations
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="center">
          <List
            sx={{
              bgcolor: "background.paper",
              mt: 2,
            }}
          >
            {locationData?.results.map((value) => {
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
        </Grid>
      </Grid>
    </>
  );
};

export default Locations;
