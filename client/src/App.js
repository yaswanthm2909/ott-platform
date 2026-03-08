import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";

import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <PrivateRoute>
              <MovieDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;