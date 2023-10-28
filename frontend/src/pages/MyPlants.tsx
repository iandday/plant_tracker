import {
  Card,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import usePlantAPI from "../hooks/usePlantAPI";
import { PlantList } from "../hooks/usePlantAPI";

const MyPlants = () => {
  const { response: data } = usePlantAPI<PlantList>({
    method: "get",
    url: `/plant`,
  });

  const navigate = useNavigate();

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
            My Plants
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {data?.results.map((plant) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            display="flex"
          >
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
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyPlants;
