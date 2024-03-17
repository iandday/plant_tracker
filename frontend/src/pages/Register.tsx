import { UserApi, UserCreate } from '../services/index';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, ButtonGroup, Grid, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';

export interface Register {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
const Register = () => {
  const api = new UserApi();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Register> = async (data: Register) => {
    try {
      const register_data: UserCreate = {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        disabled: false
      };
      const response = await api.createUserUserPost(register_data);

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      reset;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Register>();

  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' | Register'}</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0} direction="column" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item>
            <Stack>
              <h1>Register</h1>
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
              <TextField
                fullWidth
                required
                id="first_name"
                label="First Name"
                type="filled"
                {...register('first_name')}
                error={errors.first_name ? true : false}
                sx={{ pt: 5 }}
              />
              <TextField
                fullWidth
                required
                id="last_name"
                label="Last Name"
                type="filled"
                {...register('last_name')}
                error={errors.last_name ? true : false}
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
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Register;
