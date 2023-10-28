import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Grid, Stack, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import usePlantAPI, { Plant } from "../hooks/usePlantAPI";

const EditPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { response: initial_data, loading: initial_isLoading } =
    usePlantAPI<Plant>({ method: "get", url: `/plant/${id}` });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Plant>({
    defaultValues: { ...initial_data },
  });

  // repopulate fields after API call completes
  useEffect(() => {
    reset({ ...initial_data });
  }, [initial_isLoading]);

  const [updateData, setUpdateData] = useState<Plant | false>(false);
  const { sendData: update_sendData } = usePlantAPI({
    method: "patch",
    url: "/plant",
    data: updateData,
  });

  const onSubmit: SubmitHandler<Plant> = (data: Plant) => {
    setUpdateData(data);
    update_sendData();
  };

  // update backend
  useEffect(() => {
    // only run when data is available
    if (updateData) {
      update_sendData();
      navigate(`/myPlants/${id}`);
    }
  }, [updateData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Stack>
              <TextField
                required
                id="name"
                label="Name"
                type="filled"
                {...register("name")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                required
                id="common_name"
                label="Common Name"
                type="filled"
                {...register("common_name")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                required
                id="scientific_name"
                label="Scientific Name"
                type="filled"
                {...register("scientific_name")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                required
                id="location"
                label="Location"
                type="filled"
                {...register("location")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                id="purchase_date"
                label="Purchase Date"
                type="date"
                {...register("purchase_date")}
                error={errors.name ? true : false}
                sx={{ pt: 5 }}
              />

              <ButtonGroup
                variant="contained"
                sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}
              >
                <Button type="submit" sx={{ color: "text.primary" }}>
                  Submit
                </Button>
                <Button
                  sx={{ color: "warning.main" }}
                  onClick={() => {
                    reset({ ...initial_data });
                  }}
                >
                  Reset
                </Button>
                <Button
                  sx={{ color: "error.main" }}
                  onClick={() => {
                    navigate(`/myPlants/${id}`);
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditPlant;
