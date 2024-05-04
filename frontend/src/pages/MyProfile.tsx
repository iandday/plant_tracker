import { useEffect, useState } from 'react';
import { UserApi, UserSchema } from '../services';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { Button, ButtonGroup, Grid, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

const MyProfile = () => {
  const api = new UserApi(undefined, BASE_PATH, axiosInstance);

  const [updateProfile, setUpdateProfile] = useState<number>(0);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserSchema>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewUserMe();
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [updateProfile]);

  const {
    //register,
    handleSubmit,
    reset,
    control,
    //setValue,
    formState: { errors }
  } = useForm<UserSchema>({
    defaultValues: { ...userData }
  });

  const onSubmit = async (data: UserSchema) => {
    try {
      const response = await api.trackerApiViewUserUpdateMe({ ...data });
      if (response.status === 200) {
        setShowEdit((oldValue) => !oldValue);
        setUpdateProfile((oldValue) => oldValue + 1);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | My Profile'}</title>
      </Helmet>
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
        {showEdit ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={0} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
              <Grid item>
                <Stack>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        required
                        id="first_name"
                        label="First Name"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.first_name ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        fullWidth
                        required
                        id="last_name"
                        label="Last Name"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.last_name ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        fullWidth
                        required
                        id="email"
                        label="Email"
                        type="filled"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ''}
                        error={errors.email ? true : false}
                        sx={{ pt: 5 }}
                      />
                    )}
                  />

                  <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
                    <Button type="submit" sx={{ color: 'text.primary' }}>
                      Submit
                    </Button>
                    <Button
                      sx={{ color: 'warning.main' }}
                      onClick={() => {
                        reset({ ...userData });
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      sx={{ color: 'error.main' }}
                      onClick={() => {
                        setShowEdit((oldValue) => !oldValue);
                      }}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </form>
        ) : null}
      </Grid>
    </>
  );
};

export default MyProfile;
