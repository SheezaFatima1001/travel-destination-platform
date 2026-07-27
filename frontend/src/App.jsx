import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
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
            element={<DestinationDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>


        {/* =================================
            ADMIN DASHBOARD
        ================================= */}

      {/* =================================
    ADMIN DASHBOARD
================================= */}

<Route
  path="/admin"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/destinations"
  element={<AdminDestinations />}
/>

<Route
  path="/admin/destinations/new"
  element={<DestinationForm />}
/>

<Route
  path="/admin/destinations/edit/:id"
  element={<DestinationForm />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;