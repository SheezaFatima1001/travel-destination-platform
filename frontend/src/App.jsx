import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDestinations from "./pages/admin/AdminDestinations";
import DestinationForm from "./pages/admin/DestinationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            PUBLIC WEBSITE
            Navbar + Footer from MainLayout
        ================================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/destinations"
            element={<Destinations />}
          />

          <Route
            path="/destinations/:id"
            element={<DestinationDetail />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
          path="/admin"
          element={<AdminDashboard/>}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>


        {/* =================================
            ADMIN WEBSITE
            No public Navbar/Footer
        ================================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/destinations"
          element={<AdminDestinations />}
        />

        {/* Add Destination */}
        <Route
          path="/admin/destinations/add"
          element={<DestinationForm />}
        />

        {/* Edit Destination */}
        <Route
          path="/admin/destinations/edit/:id"
          element={<DestinationForm />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;