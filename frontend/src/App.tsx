import { Routes } from "react-router";
import Navigation from "./components/Navigation";
import MyPlants from "./pages/MyPlants";
import { BrowserRouter, Route } from "react-router-dom";
import MyActivity from "./pages/MyActivity";
import UserSettings from "./pages/UserSettings";
import PlantDetail from "./pages/PlantDetail";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens, getThemedComponents } from "./theme/Theme";
import { ColorModeContext } from "./config/color-context";
import React from "react";
import { CssBaseline } from "@mui/material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState();

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  let theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/myPlants" element={<MyPlants />} />
              <Route path="/myPlants/:id" element={<PlantDetail />} />
              <Route path="/activity" element={<MyActivity />} />
              <Route path="/settings" element={<UserSettings />} />
            </Routes>
            <Navigation />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
