import React from 'react';
import { LocationReturn, PlantReturn } from '../services';
import { Grid, Card, ImageListItem, ImageListItemBar, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  plants: PlantReturn;
  locations: LocationReturn;
}

const PlantListing = ({ plants, locations }: Props) => {
  const navigate = useNavigate();

  function findArrayElementByID<T>(array: T[], id: string): T {
    const result = array.find((element: T) => element.id === id);
    if (result) {
      return result;
    } else {
      return { name: 'Unknown' };
    }
  }
  return (
    <>
      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
        {plants?.results.map((plant) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            display="flex"
            key={plant.id}
          >
            <Card
              key={plant.id}
              sx={{ maxWidth: 300 }}
              onClick={() => {
                navigate(`/myPlants/${plant.id}`);
              }}
            >
              <ImageListItem sx={{ height: '100% !important' }} id={plant.id}>
                <ImageListItemBar
                  style={{ width: 300 }}
                  sx={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)'
                  }}
                  title={plant.name}
                  subtitle={findArrayElementByID(locations.results, plant.location_id).name}
                  position="top"
                />
                <img
                  srcSet={`${plant.photo_url}`}
                  src={`${plant.photo_url}`}
                  alt={plant.name}
                  loading="lazy"
                  style={{ height: 300, width: 300 }}
                />
                <ImageListItemBar
                  style={{ width: 300 }}
                  title={plant.common_name}
                  actionIcon={
                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${plant.name}`}>
                      <Tooltip title={plant.scientific_name} placement="top">
                        <InfoIcon />
                      </Tooltip>
                    </IconButton>
                  }
                  position="bottom"
                />
              </ImageListItem>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlantListing;
