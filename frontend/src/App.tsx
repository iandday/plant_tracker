import { Routes } from "react-router";
import Navigation from "./components/Navigation";
import MyPlants from "./pages/MyPlants";
import { BrowserRouter, Route } from "react-router-dom";
import MyActivity from "./pages/MyActivity";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/myPlants" element={<MyPlants />} />
          <Route path="/activity" element={<MyActivity />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
        <Navigation />
      </BrowserRouter>
    </>
  );
}

export default App;
