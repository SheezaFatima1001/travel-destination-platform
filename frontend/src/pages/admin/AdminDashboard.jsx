import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DESTINATIONS FROM MONGODB
  // ==========================================

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
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================

  const totalDestinations = destinations.length;

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured === true
  ).length;

  const categories = useMemo(() => {
    return new Set(
      destinations
        .map((destination) => destination.category)
        .filter(Boolean)
    ).size;
  }, [destinations]);

  const averageRating = useMemo(() => {
    if (destinations.length === 0) {
      return 0;
    }

    const ratedDestinations = destinations.filter(
      (destination) =>
        destination.rating !== undefined &&
        destination.rating !== null &&
        destination.rating !== ""
    );

    if (ratedDestinations.length === 0) {
      return 0;
    }

    const totalRating = ratedDestinations.reduce(
      (sum, destination) =>
        sum + Number(destination.rating),
      0
    );

    return (
      totalRating / ratedDestinations.length
    ).toFixed(1);
  }, [destinations]);

  // ==========================================
  // RECENT DESTINATIONS
  // ==========================================

  const recentDestinations = useMemo(() => {
    return [...destinations]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 5);
  }, [destinations]);

  // ==========================================
  // DELETE DESTINATION
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/destinations/${id}`
      );

      setDestinations((previousDestinations) =>
        previousDestinations.filter(
          (destination) =>
            destination._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Error deleting destination:",
        err
      );

      alert(
        "Unable to delete destination. Please try again."
      );
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-400" />

          <p className="mt-5 text-sm text-gray-500">
            Loading admin dashboard...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[#050914] text-white lg:block">

        {/* Logo */}

        <div className="flex h-24 items-center px-8">

          <Link
            to="/"
            className="text-2xl font-bold tracking-wide"
          >
            Wander
            <span className="text-amber-400">
              ly
            </span>
          </Link>

        </div>


        {/* Navigation */}

        <nav className="px-4">

          <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/30">
            Administration
          </p>

          <Link
            to="/admin"
            className="flex items-center rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-[#050914]"
          >
            Dashboard
          </Link>

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


      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="lg:ml-64">

        {/* Header */}

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-xl">

          <div className="flex min-h-20 items-center justify-between px-6 lg:px-10">

            <div>

              <p className="text-sm text-gray-400">
                Administration
              </p>

              <h1 className="text-xl font-bold">
                Dashboard
              </h1>

            </div>

            <Link
              to="/admin/destinations/add"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#050914] transition hover:bg-amber-300"
            >
              Add Destination
            </Link>

          </div>

        </header>


        {/* ==========================================
            DASHBOARD CONTENT
        ========================================== */}

        <div className="px-6 py-10 lg:px-10 lg:py-12">

          <div className="mx-auto max-w-7xl">

            {/* Page Introduction */}

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
                Overview
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Welcome to your dashboard
              </h2>

              <p className="mt-3 max-w-2xl text-gray-500">
                Manage your travel destinations and
                monitor your destination collection.
              </p>

            </div>


            {/* Error */}

            {error && (

              <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>

            )}


            {/* ==========================================
                STATISTICS
            ========================================== */}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total Destinations */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Total Destinations
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {totalDestinations}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    All
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Destinations stored in MongoDB
                </p>

              </div>


              {/* Featured Destinations */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Featured
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {featuredDestinations}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Featured
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Highlighted destinations
                </p>

              </div>


              {/* Categories */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Categories
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {categories}
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-600">
                    Types
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Destination categories
                </p>

              </div>


              {/* Average Rating */}

              <div className="rounded-[2rem] bg-white p-7 shadow-sm">

                <p className="text-sm font-medium text-gray-500">
                  Average Rating
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <h3 className="text-4xl font-bold">
                    {averageRating}
                    <span className="text-xl text-gray-400">
                      /5
                    </span>
                  </h3>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-600">
                    ★
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-400">
                  Average destination rating
                </p>

              </div>

            </div>


            {/* ==========================================
                RECENT DESTINATIONS
            ========================================== */}

            <div className="mt-12">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
                    Destination Management
                  </p>

                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Recent Destinations
                  </h2>

                </div>

                <Link
                  to="/admin/destinations"
                  className="text-sm font-semibold text-amber-600 transition hover:text-amber-500"
                >
                  View all destinations →
                </Link>

              </div>


              {/* Destination List */}

              {recentDestinations.length === 0 ? (

                <div className="mt-8 rounded-[2rem] bg-white px-6 py-20 text-center shadow-sm">

                  <h3 className="text-xl font-bold">
                    No destinations yet
                  </h3>

                  <p className="mt-3 text-gray-500">
                    Add your first destination to start
                    building your travel collection.
                  </p>

                  <Link
                    to="/admin/destinations/add"
                    className="mt-7 inline-flex rounded-full bg-amber-400 px-7 py-3 font-semibold text-[#050914] transition hover:bg-amber-300"
                  >
                    Add Destination
                  </Link>

                </div>

              ) : (

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                  {recentDestinations.map(
                    (destination) => (

                      <article
                        key={destination._id}
                        className="overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* Image */}

                        <div className="relative h-56 overflow-hidden">

                          <img
                            src={destination.imageUrl}
                            alt={destination.name}
                            className="h-full w-full object-cover transition duration-700 hover:scale-105"
                          />

                          {/* Featured */}

                          {destination.featured && (

                            <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-[#050914]">
                              Featured
                            </span>

                          )}

                          {/* Category */}

                          <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                            {destination.category}
                          </span>

                        </div>


                        {/* Content */}

                        <div className="p-6">

                          <p className="text-sm text-gray-400">
                            {destination.location},{" "}
                            {destination.country}
                          </p>

                          <h3 className="mt-2 text-xl font-bold">
                            {destination.name}
                          </h3>


                          {/* Rating and Popularity */}

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-600">
                              ★{" "}
                              {destination.rating !==
                                undefined &&
                              destination.rating !==
                                null &&
                              destination.rating !== ""
                                ? Number(
                                    destination.rating
                                  ).toFixed(1)
                                : "N/A"}
                            </span>

                            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                              Popularity:{" "}
                              {destination.popularity !==
                                undefined &&
                              destination.popularity !==
                                null &&
                              destination.popularity !== ""
                                ? destination.popularity
                                : "N/A"}
                            </span>

                          </div>


                          {/* Actions */}

                          <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                            <Link
                              to={`/admin/destinations/edit/${destination._id}`}
                              className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold transition hover:border-amber-400 hover:bg-amber-400"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  destination._id
                                )
                              }
                              className="flex-1 rounded-full border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </article>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;