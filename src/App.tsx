import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BuildingViewer } from "./components/building/building-viewer";
import { MapViewer } from "./components/map/map-viewer";
import { LoginForm } from "./components/db/login-form";
import { ContextProvider } from "./middleware/context-provider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/building" element={<BuildingViewer />} />
          <Route path="/map" element={<MapViewer />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
