import { Routes } from 'react-router';
import Navigation from './components/Navigation';
import MyPlants from './pages/MyPlants';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import MyEntries from './pages/MyEntries';
import UserSettings from './pages/UserSettings';
import PlantDetail from './pages/PlantDetail';

import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import { ColorModeContext } from './config/color-context';
import React from 'react';
import { CssBaseline } from '@mui/material';
import EditPlant from './pages/EditPlant';
import Areas from './pages/Areas';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import NewPlant from './pages/NewPlant';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NewEntry from './pages/NewEntry';
import EntryDetail from './pages/EntryDetail';
import MyGraveyard from './pages/MyGraveyard';
import Locations from './pages/Locations';
import Register from './pages/Register';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState('dark');

  React.useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  let theme = React.useMemo(() => createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);

  theme = responsiveFontSizes(theme);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MyPlants />} />
                {/* <Route path="/myGraveyard" element={<MyGraveyard />} /> */}
                <Route path="/myPlants" element={<MyPlants />} />
                <Route path="/myPlants/:id" element={<PlantDetail />} />
                <Route path="/editPlant/:id" element={<EditPlant />} />
                {/* <Route path="/entry" element={<MyEntries />} />
                <Route path="/entry/:id" element={<EntryDetail />} /> */}
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/areas" element={<Areas />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/myProfile" element={<MyProfile />} />
                {/* <Route path="/newPlant" element={<NewPlant />} />
                <Route path="/newEntry/:id?" element={<NewEntry />} /> */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Navigation />
            </BrowserRouter>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LocalizationProvider>
    </>
  );
}

export default App;
