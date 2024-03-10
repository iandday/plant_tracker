import React, { useEffect, useState } from 'react';
import { User, UserApi, UserReturn, UserUpdate } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Button, ButtonGroup, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const MyProfile = () => {
  const api = new UserApi(undefined, BASE_PATH, axiosInstance);

  const [profileUpdate, setProfileUpdate] = useState<number>(0);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  // make a hook
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getMeUserMeGet();
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [profileUpdate]);

  const { register, handleSubmit, reset, control, setValue } = useForm<UserUpdate>({
    defaultValues: { ...userData }
  });

  // edit function
  const editOnSubmit = async (data: User) => {
    console.log(data);
    try {
      const response = await api.updateMeUserMePost({
        first_name: data.first_name
      });
      if (response.status === 200) {
        setProfileUpdate(profileUpdate + 1);
        setShowEdit((oldValue) => !oldValue);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          My Profile
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {!showEdit ? (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography>First Name: {userData?.first_name} </Typography>
            <Typography>Last Name: {userData?.last_name}</Typography>
            <Typography>E-mail Address: {userData?.email}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                reset({ ...userData });
                setShowEdit((oldValue) => !oldValue);
              }}
            >
              Edit
            </Button>
          </Grid>
        ) : null}

        <Grid item xs={12} sx={{ mt: 2 }}>
          {showEdit ? (
            <form onSubmit={handleSubmit(editOnSubmit)}>
              <Grid container>
                <Grid item xs={7} justifyContent="flex-start">
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { invalid, isTouched, isDirty, error }
                    }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="First Name"
                        value={value}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { invalid, isTouched, isDirty, error }
                    }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="Last Name"
                        value={value}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { invalid, isTouched, isDirty, error }
                    }) => (
                      <TextField
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="filled"
                        label="E-mail"
                        value={value}
                        fullWidth
                      />
                    )}
                  />
                  <ButtonGroup orientation="horizontal">
                    <Button type="submit" variant="contained" sx={{ mt: 0 }}>
                      Submit
                    </Button>
                    <Button variant="contained" onClick={reset} sx={{ mt: 0 }}>
                      Reset
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfile;
