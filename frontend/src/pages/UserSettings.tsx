import { Grid, Stack, Typography } from "@mui/material";
import ThemeToggler from "../components/ThemeToggler";

const UserSettings = () => {
  return (
    <>
      <Grid container justifyContent="center" padding={1}>
        <Typography variant="h4">Settings</Typography>
      </Grid>
      <Stack>
        <ThemeToggler />
      </Stack>
    </>
  );
};

export default UserSettings;
