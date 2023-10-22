import {
  Card,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Typography,
} from "@mui/material";
import usePlants from "../hooks/usePlants";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const MyPlants = () => {
  const { data, error, isLoading } = usePlants();
  const navigate = useNavigate();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="stretch">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            My Plants
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageList
            gap={12}
            sx={{
              mb: 8,
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))!important",
            }}
            rowHeight={300}
          >
            {data.map((plant) => (
              <Card
                key={plant.id}
                sx={{ maxWidth: 300 }}
                onClick={() => {
                  navigate(`/myPlants/${plant.id}`);
                }}
              >
                <ImageListItem sx={{ height: "100% !important" }}>
                  <ImageListItemBar
                    style={{ width: 300 }}
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                    }}
                    title={plant.name}
                    subtitle={plant.location}
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
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${plant.name}`}
                      >
                        <Tooltip title={plant.scientific_name} placement="top">
                          <InfoIcon />
                        </Tooltip>
                      </IconButton>
                    }
                    position="bottom"
                  />
                </ImageListItem>
              </Card>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
};

export default MyPlants;
