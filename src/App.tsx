import Favorites from "./pages/Favorites";
import VendorDetails from "./pages/VendorDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

     <Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/vendors/:id"
    element={<VendorDetails />}
  />
  <Route element={<ProtectedRoute />}>
  <Route path="/favorites" element={<Favorites />} />
</Route>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;