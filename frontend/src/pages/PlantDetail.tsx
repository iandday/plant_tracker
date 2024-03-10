import {
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  ClickAwayListener,
  Grid,
  Grow,
  ListItemButton,
  MenuItem,
  MenuList,
  Paper,
  Typography
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popper from '@mui/material/Popper';
import React, { useEffect, useState } from 'react';
import { Area, AreaApi, Plant, PlantApi, Source } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';

const PlantDetail = () => {
  const { id } = useParams();
  const api = new PlantApi(undefined, BASE_PATH, axiosInstance);
  const areaApi = new AreaApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [areaData, setAreaData] = useState<Area>();
  const [plantData, setPlantData] = useState<Plant>();

  // get plant details and then area details
  useEffect(() => {
    const fetchData = async () => {
      console.log('start');
      setLoading(true);
      try {
        const response = await api.getPlantByIdPlantPlantIdGet(id!);
        if (response.status === 200) {
          setPlantData(response.data);
          console.log('here');
        }
        const locResponse = await areaApi.getAreaAreaAreaIdGet(response.data.area_id);
        if (locResponse.status === 200) {
          setAreaData(locResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

  if (loading) {
    return <>Still loading...</>;
  }

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
          <Typography variant="button">Area: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {areaData?.name}
          </Typography>
          <Typography variant="button">Purchase Date: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {plantData?.purchase_date}
          </Typography>
          {plantData?.death_date ? (
            <>
              <Typography variant="button">Death Date: </Typography>
              <Typography variant="body1" marginLeft={2}>
                {plantData?.death_date}
              </Typography>
            </>
          ) : null}
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
            <Button
              onClick={() => {
                navigate(`/newEntry/${plantData?.id}`);
              }}
            >
              Add Activity Entry
            </Button>
            <Button
              onClick={() => {
                api.updatePlantPlantPlantIdPatch(plantData?.id!, { ...plantData, graveyard: true });
                navigate(`/myPlants}`);
              }}
            >
              Send to Graveyard
            </Button>
            <Button
              onClick={() => {
                api.deletePlantByIdPlantPlantIdDelete(plantData?.id!);
                navigate(`/myPlants}`);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
          {plantData?.sources ? (
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
                        {plantData!.sources!.map((source: Source) => (
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
          ) : null}
        </Grid>
        <Grid item marginRight={2}>
          <Card sx={{ maxWidth: 150 }}>
            <CardMedia component={'img'} src={plantData?.photo_url} sx={{ height: 240 }} />
          </Card>
        </Grid>
      </Grid>

      {plantData && plantData.entries && plantData.entries.length > 0 ? (
        <>
          <Typography variant="h6" marginLeft={2}>
            Activity Entries
          </Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {plantData.entries.map((e) => (
              <ListItem key={e.id}>
                <ListItemButton component="a" href={'/entry/' + e.id}>
                  <ListItemText primary={e.activities.map((a) => a.name).join(', ')} secondary={e.timestamp} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </>
  );
};

export default PlantDetail;
