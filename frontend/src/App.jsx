import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Home"; // Add this import
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/" element={<LandingPage />} />
          {/* Add this route */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
