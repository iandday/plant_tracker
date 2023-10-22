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
          {data.common_name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PlantDetail;
