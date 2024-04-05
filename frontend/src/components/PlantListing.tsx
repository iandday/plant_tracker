import { AreaOut, PlantOut } from '../services';
import { Grid, Card, ImageListItem, ImageListItemBar, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  plants: PlantOut[];
  areas: AreaOut[];
}

const PlantListing = ({ plants, areas }: Props) => {
  const navigate = useNavigate();

  function findArrayElementByID(array: AreaOut[], id: string): AreaOut | { name: string } {
    const result = array.find((element: AreaOut) => element.id === id);
    if (result) {
      return result;
    } else {
      return { name: 'Unknown' };
    }
  }
  return (
    <>
      <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
        {plants?.map((plant) => (
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
                  subtitle={findArrayElementByID(areas, plant.area!).name}
                  position="top"
                />
                <img
                  srcSet={`${import.meta.env.VITE_BACKEND_URL}/${plant.main_photo}`}
                  src={`${import.meta.env.VITE_BACKEND_URL}/${plant.main_photo}`}
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
