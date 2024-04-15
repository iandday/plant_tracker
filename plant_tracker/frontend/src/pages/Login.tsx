import { RegEnabledSchema, UserApi } from '../services/index';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BASE_PATH } from '../services/base';
import axiosInstance from '../provider/CustomAxios';
import { useEffect, useState } from 'react';

export interface Login {
  email: string;
  password: string;
}
const Login = () => {
  const api = new UserApi(undefined, BASE_PATH, axiosInstance);
  const [loading, setLoading] = useState(true);
  const [regData, setRegData] = useState<RegEnabledSchema>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.trackerApiViewUserRegEnabled();
        if (response.status === 200) {
          setRegData(response.data);
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Login> = async (data: Login) => {
    try {
      const response = await api.trackerApiViewUserNewToken({ email: data.email, password: data.password });
      const { access: access_token, refresh: refresh_token } = response.data;

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      navigate(`/`);
    } catch (error) {
      // Handle login error
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Login>();

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Login'}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item>
            <Stack>
              <h1> Login</h1>
              <TextField
                required
                id="email"
                label="Email"
                type="filled"
                {...register('email')}
                error={errors.email ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                required
                id="password"
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password ? true : false}
                sx={{ pt: 5 }}
              />

              <ButtonGroup variant="contained" sx={{ pt: 4, paddingLeft: 4, paddingRight: 4 }}>
                <Button type="submit" sx={{ color: 'text.primary' }}>
                  Submit
                </Button>
                <Button
                  sx={{ color: 'warning.main' }}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </Button>
                {regData?.enabled ? (
                  <Button
                    sx={{ color: 'text.primary' }}
                    onClick={() => {
                      navigate('/register');
                    }}
                  >
                    Register
                  </Button>
                ) : null}
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
