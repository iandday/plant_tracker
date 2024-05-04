import { Routes } from 'react-router';
import MyPlants from './pages/MyPlants';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import MyEntries from './pages/MyEntries';
import PlantDetail from './pages/PlantDetail';
import { HelmetProvider } from 'react-helmet-async';
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
import Activities from './pages/Activities';
import ImportExport from './pages/ImportExport';
import ResponsiveAppBar from './components/AppBar';

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
            <HelmetProvider>
              <BrowserRouter>
                <ResponsiveAppBar />
                <Routes>
                  <Route path="/" element={<MyPlants />} />
                  <Route path="/myGraveyard" element={<MyGraveyard />} />
                  <Route path="/myPlants" element={<MyPlants />} />
                  <Route path="/myPlants/:id" element={<PlantDetail />} />
                  <Route path="/editPlant/:id" element={<EditPlant />} />
                  <Route path="/entry" element={<MyEntries />} />
                  <Route path="/entry/:id" element={<EntryDetail />} />
                  <Route path="/areas" element={<Areas />} />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/myProfile" element={<MyProfile />} />
                  <Route path="/newPlant" element={<NewPlant />} />
                  <Route path="/importExport" element={<ImportExport />} />
                  <Route path="/newEntry/:id?" element={<NewEntry />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </BrowserRouter>
            </HelmetProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </LocalizationProvider>
    </>
  );
}

export default App;
