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
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import React from "react";
import usePlantAPI, { Plant } from "../hooks/usePlantAPI";

const PlantDetail = () => {
  const { id } = useParams();
  const {
    response: data,
    error: error,
    loading: isLoading,
    sendData: sendData,
  } = usePlantAPI<Plant>({ method: "get", url: `/plant/${id}` });

  const navigate = useNavigate();

  // start reference menu item
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
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
        {data?.name}
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        columns={{ xs: 2, sm: 3, md: 2 }}
      >
        <Grid item marginLeft={2} xs="auto">
          <Typography variant="button">Common Name:</Typography>
          <Typography variant="body1" marginLeft={2}>
            {data?.common_name}
          </Typography>
          <Typography variant="button">Scientific Name: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {data?.scientific_name}
          </Typography>
          <Typography variant="button">Location: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {data?.location}
          </Typography>
          <Typography variant="button">Purchase Date: </Typography>
          <Typography variant="body1" marginLeft={2}>
            {data?.purchase_date}
          </Typography>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={handleClick} color="secondary">
              Reference
            </Button>
            <Button
              size="medium"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
              color="secondary"
            >
              <ArrowDropDownIcon />
            </Button>
            <Button
              onClick={() => {
                navigate(`/editPlant/${data?.id}`);
              }}
            >
              Edit
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
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
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="reference" autoFocusItem>
                      {data?.sources.map((source) => (
                        <MenuItem
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          component="a"
                          selected={false}
                          onClick={handleClose}
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
            <CardMedia
              component={"img"}
              src={data?.photo_url}
              sx={{ height: 240 }}
            />
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
