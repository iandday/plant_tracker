import {
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popper from '@mui/material/Popper';
import React, { useEffect, useState } from 'react';
import { Location, LocationApi, Plant, PlantApi, PlantReturn } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';

const PlantDetail = () => {
  const { id } = useParams();
  const api = new PlantApi(null, BASE_PATH, axiosInstance);
  const locationApi = new LocationApi(null, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [plantUpdate, setPlantUpdate] = useState<number>(0);
  const [locationData, setLocationData] = useState<Location>();
  const [plantData, setPlantData] = useState<Plant>();

  // get plant details and then location details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getPlantByIdPlantPlantIdGet(id);
        if (response.status === 200) {
          setPlantData(response.data);
        }
        const locResponse = await locationApi.getLocationLocationLocationIdGet(response.data.location_id);
        if (locResponse.status === 200) {
          setLocationData(locResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [plantUpdate]);

  const navigate = useNavigate();

  // start reference menu item
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };
  const handleClick = () => {
    console.info(`You clicked`);
  };
  // end reference menu item

  return (
    <>
      <Typography variant="h4" align="center">
        {plantData?.name}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="stretch" columns={{ xs: 2, sm: 3, md: 2 }}>
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Common Name:</Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.common_name}
          </Typography>
          <Typography variant="button">Scientific Name: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.scientific_name}
          </Typography>
          <Typography variant="button">Location: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {locationData?.name}
          </Typography>
          <Typography variant="button">Purchase Date: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.purchase_date}
          </Typography>
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button onClick={handleClick} color="secondary">
              Reference
            </Button>
            <Button
              size="medium"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
              color="secondary"
            >
              <ArrowDropDownIcon />
            </Button>
            <Button
              onClick={() => {
                navigate(`/editPlant/${plantData?.id}`);
              }}
            >
              Edit
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="reference" autoFocusItem>
                      {plantData?.sources.map((source) => (
                        <MenuItem
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          component="a"
                          selected={false}
                          onClick={() => {
                            handleClose;
                          }}
                        >
                          {source.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
        <Grid item marginRight={2}>
          <Card sx={{ maxWidth: 150 }}>
            <CardMedia component={'img'} src={plantData?.photo_url} sx={{ height: 240 }} />
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" marginLeft={2}>
        Activity
      </Typography>
    </>
  );
};

export default PlantDetail;
