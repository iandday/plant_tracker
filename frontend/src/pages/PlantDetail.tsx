import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import usePlantDetail from "../hooks/usePlantDetail";

const PlantDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = usePlantDetail(id!);

  return (
    <Grid container justifyContent="space-between" alignItems="stretch">
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {data?.name}
        </Typography>
        <Typography variant="h6">Common Name:</Typography> {data?.common_name}
        <Typography variant="h6">Scientific Name:</Typography>
        {data?.scientific_name}
        <img
          srcSet={`${data?.photo_url}`}
          src={`${data?.photo_url}`}
          alt={data?.name}
          loading="lazy"
          style={{ height: 400, width: "auto" }}
        />
      </Grid>
    </Grid>
  );
};

export default PlantDetail;
