import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // =====================================================
  // FETCH DESTINATIONS
  // =====================================================

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/destinations"
      );

      setDestinations(response.data);
    } catch (err) {
      console.error("Error fetching destinations:", err);

      setError(
        "Unable to load destinations. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchDestinations();
  }, []);

  // =====================================================
  // DELETE DESTINATION
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await axios.delete(
        `http://localhost:5000/api/destinations/${id}`
      );

      // Remove deleted destination from current list
      setDestinations((previousDestinations) =>
        previousDestinations.filter(
          (destination) => destination._id !== id
        )
      );
    } catch (err) {
      console.error("Error deleting destination:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete destination. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const totalDestinations = destinations.length;

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured === true
  ).length;

  const totalCategories = new Set(
    destinations
      .map((destination) => destination.category)
      .filter(Boolean)
  ).size;

  const averageRating = useMemo(() => {
    if (destinations.length === 0) {
      return "0.0";
    }

    const validRatings = destinations
      .map((destination) => Number(destination.rating))
      .filter((rating) => !isNaN(rating));

    if (validRatings.length === 0) {
      return "0.0";
    }

    const totalRating = validRatings.reduce(
      (sum, rating) => sum + rating,
      0
    );

    return (totalRating / validRatings.length).toFixed(1);
  }, [destinations]);

  // =====================================================
  // RECENT DESTINATIONS
  // =====================================================

  const recentDestinations = useMemo(() => {
    return [...destinations]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5);
  }, [destinations]);

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[#050914] text-white lg:block">

        {/* Logo */}

        <div className="flex h-24 items-center px-8">

          <Link
            to="/"
            className="text-2xl font-bold tracking-wide"
          >
            Wander<span className="text-amber-400">
              ly
            </span>
          </Link>

        </div>


        {/* Navigation */}

        <nav className="px-4">

          <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/30">
            Administration
          </p>

          {/* Dashboard */}

          <Link
            to="/admin"
            className="flex items-center rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-[#050914]"
          >
            Dashboard
          </Link>

          {/* Destinations */}

          <Link
            to="/admin/destinations"
            className="mt-2 flex items-center rounded-2xl px-5 py-4 text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            Destinations
          </Link>

        </nav>


        {/* Bottom Navigation */}

        <div className="absolute bottom-6 left-4 right-4">

          <Link
            to="/destinations"
            className="flex items-center rounded-2xl border border-white/10 px-5 py-4 text-sm text-white/60 transition hover:border-amber-400/50 hover:text-amber-400"
          >
            Back to Website
          </Link>

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="lg:ml-64">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-xl">

          <div className="flex min-h-20 items-center justify-between gap-5 px-6 lg:px-10">

            <div>

              <p className="text-sm text-gray-400">
                Administration
              </p>

              <h1 className="text-xl font-bold">
                Dashboard
              </h1>

            </div>

            <Link
              to="/admin/destinations/new"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#050914] transition hover:bg-amber-300"
            >
              Add Destination
            </Link>

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <div className="px-6 py-10 lg:px-10 lg:py-12">

          <div className="mx-auto max-w-7xl">

            {/* Page Introduction */}

            <div className="mb-10">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
                Overview
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to your dashboard
              </h2>

              <p className="mt-3 max-w-2xl text-gray-500">
                Manage your travel destinations and monitor
                your destination collection from one place.
              </p>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="mb-8 flex items-center justify-between gap-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">

                <p>
                  {error}
                </p>

                <button
                  onClick={fetchDestinations}
                  className="font-semibold underline"
                >
                  Try again
                </button>

              </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total Destinations */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Total Destinations
                </p>

                <div className="mt-5 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {loading ? "—" : totalDestinations}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Places
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  All destinations in MongoDB
                </p>

              </div>


              {/* Featured */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Featured Destinations
                </p>

                <div className="mt-5 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {loading ? "—" : featuredDestinations}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Featured
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Highlighted on the website
                </p>

              </div>


              {/* Categories */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Categories
                </p>

                <div className="mt-5 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {loading ? "—" : totalCategories}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Types
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Different travel categories
                </p>

              </div>


              {/* Average Rating */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Average Rating
                </p>

                <div className="mt-5 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {loading ? "—" : averageRating}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    / 5
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Average destination rating
                </p>

              </div>

            </div>


            {/* =================================================
                DESTINATION MANAGEMENT
            ================================================= */}

            <div className="mt-12">

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                    Management
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Destination Collection
                  </h3>

                </div>

                <Link
                  to="/admin/destinations"
                  className="text-sm font-semibold text-gray-500 transition hover:text-amber-500"
                >
                  View all destinations →
                </Link>

              </div>


              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-400" />

                  <p className="mt-5 text-gray-500">
                    Loading destinations...
                  </p>

                </div>

              ) : recentDestinations.length === 0 ? (

                /* =================================================
                    EMPTY STATE
                ================================================= */

                <div className="rounded-[2rem] bg-white px-6 py-20 text-center shadow-sm">

                  <h3 className="text-2xl font-bold">
                    No destinations yet
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-gray-500">
                    Start building your destination collection
                    by adding your first destination.
                  </p>

                  <Link
                    to="/admin/destinations/new"
                    className="mt-7 inline-flex rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#050914] transition hover:bg-amber-300"
                  >
                    Add Your First Destination
                  </Link>

                </div>

              ) : (

                /* =================================================
                    DESTINATION TABLE
                ================================================= */

                <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                      <thead>

                        <tr className="border-b border-gray-100 text-left">

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Destination
                          </th>

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Category
                          </th>

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Rating
                          </th>

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Popularity
                          </th>

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Status
                          </th>

                          <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Actions
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {recentDestinations.map(
                          (destination) => (

                            <tr
                              key={destination._id}
                              className="border-b border-gray-100 last:border-0"
                            >

                              {/* Destination */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-4">

                                  <img
                                    src={destination.imageUrl}
                                    alt={destination.name}
                                    className="h-14 w-14 rounded-xl object-cover"
                                  />

                                  <div>

                                    <p className="font-semibold text-[#101828]">
                                      {destination.name}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                      {destination.location},{" "}
                                      {destination.country}
                                    </p>

                                  </div>

                                </div>

                              </td>


                              {/* Category */}

                              <td className="px-6 py-5">

                                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                  {destination.category}
                                </span>

                              </td>


                              {/* Rating */}

                              <td className="px-6 py-5">

                                <span className="font-semibold">
                                  {destination.rating
                                    ? Number(
                                        destination.rating
                                      ).toFixed(1)
                                    : "0.0"}
                                </span>

                                <span className="ml-1 text-amber-500">
                                  ★
                                </span>

                              </td>


                              {/* Popularity */}

                              <td className="px-6 py-5">

                                <span className="font-semibold">
                                  {destination.popularity || 0}
                                </span>

                              </td>


                              {/* Status */}

                              <td className="px-6 py-5">

                                {destination.featured ? (

                                  <span className="rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-600">
                                    Featured
                                  </span>

                                ) : (

                                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
                                    Standard
                                  </span>

                                )}

                              </td>


                              {/* Actions */}

                              <td className="px-6 py-5">

                                <div className="flex items-center gap-3">

                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/admin/destinations/edit/${destination._id}`
                                      )
                                    }
                                    className="text-sm font-semibold text-gray-600 transition hover:text-amber-500"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        destination._id
                                      )
                                    }
                                    disabled={
                                      deletingId ===
                                      destination._id
                                    }
                                    className="text-sm font-semibold text-red-500 transition hover:text-red-600 disabled:opacity-50"
                                  >
                                    {deletingId ===
                                    destination._id
                                      ? "Deleting..."
                                      : "Delete"}
                                  </button>

                                </div>

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              )}

            </div>


            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="mt-12">

              <h3 className="text-2xl font-bold">
                Quick Actions
              </h3>

              <div className="mt-6 grid gap-5 md:grid-cols-3">

                {/* Add Destination */}

                <Link
                  to="/admin/destinations/new"
                  className="group rounded-[2rem] bg-[#050914] p-7 text-white transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <p className="text-sm font-semibold text-amber-400">
                    Destination Management
                  </p>

                  <h4 className="mt-4 text-xl font-bold">
                    Add New Destination
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-white/50">
                    Create a new destination and make it
                    available on the website.
                  </p>

                  <p className="mt-6 font-semibold text-amber-400">
                    Add destination →
                  </p>

                </Link>


                {/* Manage Destinations */}

                <Link
                  to="/admin/destinations"
                  className="group rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <p className="text-sm font-semibold text-amber-500">
                    Destination Management
                  </p>

                  <h4 className="mt-4 text-xl font-bold">
                    Manage Destinations
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    View, edit, update, or remove destinations
                    from your collection.
                  </p>

                  <p className="mt-6 font-semibold text-[#101828]">
                    Manage collection →
                  </p>

                </Link>


                {/* View Website */}

                <Link
                  to="/destinations"
                  className="group rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <p className="text-sm font-semibold text-amber-500">
                    Website
                  </p>

                  <h4 className="mt-4 text-xl font-bold">
                    View Live Destinations
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    See how your destinations appear to
                    visitors on the main website.
                  </p>

                  <p className="mt-6 font-semibold text-[#101828]">
                    Visit website →
                  </p>

                </Link>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;