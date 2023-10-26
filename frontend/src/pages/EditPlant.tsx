import React, { useEffect } from "react";
import usePlantDetail from "../hooks/usePlantDetail";
import { useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { ResetTv } from "@mui/icons-material";

const EditPlant = () => {
  const { id } = useParams();
  const {
    data: initial_data,
    error: initial_error,
    isLoading: initial_isLoading,
  } = usePlantDetail(id!);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initial_data },
  });

  // repopulate fields after API call completes
  useEffect(() => {
    reset({ ...initial_data });
  }, [initial_isLoading]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <TextField
        required
        id="name"
        name="name"
        label="Full Name"
        margin="dense"
        {...register("name")}
        error={errors.name ? true : false}
      />
      {JSON.stringify(initial_data)}
    </>
  );
};

export default EditPlant;
