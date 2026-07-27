import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch destinations from MongoDB
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

  // Total featured destinations
  const featuredCount = useMemo(() => {
    return destinations.filter(
      (destination) => destination.featured === true
    ).length;
  }, [destinations]);

  // Total categories
  const categoryCount = useMemo(() => {
    return new Set(
      destinations
        .map((destination) => destination.category)
        .filter(Boolean)
    ).size;
  }, [destinations]);

  // Latest destinations
  const recentDestinations = useMemo(() => {
    return [...destinations]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 6);
  }, [destinations]);

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[#050914] text-white lg:block">

        {/* Logo */}
        <div className="flex h-24 items-center px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide"
          >
            Wander<span className="text-amber-400">ly</span>
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
            className="flex items-center gap-4 rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-[#050914]"
          >
            <span>▦</span>
            Dashboard
          </Link>

          {/* Destinations */}
          <Link
            to="/admin/destinations"
            className="mt-2 flex items-center gap-4 rounded-2xl px-5 py-4 text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <span>◈</span>
            Destinations
          </Link>

        </nav>

        {/* Bottom */}
        <div className="absolute bottom-6 left-4 right-4">

          <Link
            to="/destinations"
            className="flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 text-sm text-white/60 transition hover:border-amber-400/50 hover:text-amber-400"
          >
            <span>←</span>
            Back to Website
          </Link>

        </div>

      </aside>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="lg:ml-64">

        {/* Top Navbar */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-6 lg:px-10">

            <div>
              <p className="text-sm text-gray-400">
                Administration
              </p>

              <h1 className="text-xl font-bold">
                Dashboard
              </h1>
            </div>

            <Link
              to="/"
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-amber-400 hover:bg-amber-400"
            >
              View Website
            </Link>

          </div>

        </header>


        {/* Dashboard Content */}
        <div className="px-6 py-10 lg:px-10 lg:py-12">

          {/* Welcome */}
          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
              Overview
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to Wanderly Admin
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Manage your travel destinations and keep your
              website content up to date.
            </p>

          </div>


          {/* =========================================
              STATISTICS
          ========================================= */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {/* Total Destinations */}
            <div className="rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Destinations
                  </p>

                  <h3 className="mt-4 text-4xl font-bold">
                    {loading ? "—" : destinations.length}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-500">
                  ◈
                </div>

              </div>

              <p className="mt-5 text-sm text-gray-400">
                Destinations stored in MongoDB
              </p>

            </div>


            {/* Featured */}
            <div className="rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Featured Destinations
                  </p>

                  <h3 className="mt-4 text-4xl font-bold">
                    {loading ? "—" : featuredCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-500">
                  ★
                </div>

              </div>

              <p className="mt-5 text-sm text-gray-400">
                Destinations highlighted on the website
              </p>

            </div>


            {/* Categories */}
            <div className="rounded-[2rem] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Categories
                  </p>

                  <h3 className="mt-4 text-4xl font-bold">
                    {loading ? "—" : categoryCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-500">
                  ✦
                </div>

              </div>

              <p className="mt-5 text-sm text-gray-400">
                Different travel categories
              </p>

            </div>

          </div>


          {/* =========================================
              QUICK ACTION
          ========================================= */}

          <div className="mt-10 rounded-[2rem] bg-[#050914] p-8 text-white md:p-10">

            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Manage content
                </p>

                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  Keep your destinations up to date
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                  Add new destinations, update existing information,
                  or remove destinations that are no longer available.
                </p>

              </div>

              <button
                onClick={() => navigate("/admin/destinations")}
                className="shrink-0 rounded-full bg-amber-400 px-7 py-4 font-semibold text-[#050914] transition hover:bg-amber-300"
              >
                Manage Destinations →
              </button>

            </div>

          </div>


          {/* =========================================
              RECENT DESTINATIONS
          ========================================= */}

          <div className="mt-12">

            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                  Recent additions
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Latest Destinations
                </h3>

              </div>

              <Link
                to="/admin/destinations"
                className="text-sm font-semibold text-gray-500 transition hover:text-amber-500"
              >
                View all destinations →
              </Link>

            </div>


            {/* Loading */}
            {loading && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-[2rem] bg-white"
                  />
                ))}

              </div>
            )}


            {/* Error */}
            {!loading && error && (
              <div className="rounded-[2rem] bg-white p-10 text-center text-red-500">
                {error}
              </div>
            )}


            {/* No Data */}
            {!loading &&
              !error &&
              recentDestinations.length === 0 && (
                <div className="rounded-[2rem] bg-white px-6 py-20 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 text-3xl">
                    🌍
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    No destinations yet
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Add your first destination to get started.
                  </p>

                  <Link
                    to="/admin/destinations"
                    className="mt-6 inline-flex rounded-full bg-[#050914] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-[#050914]"
                  >
                    Add Destination
                  </Link>

                </div>
              )}


            {/* Destination Cards */}
            {!loading &&
              !error &&
              recentDestinations.length > 0 && (

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {recentDestinations.map((destination) => (

                    <div
                      key={destination._id}
                      className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">

                        <img
                          src={destination.imageUrl}
                          alt={destination.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Featured */}
                        {destination.featured && (
                          <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-[#050914]">
                            Featured
                          </span>
                        )}

                      </div>


                      {/* Content */}
                      <div className="p-6">

                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                          {destination.category}
                        </p>

                        <h4 className="mt-2 text-xl font-bold">
                          {destination.name}
                        </h4>

                        <p className="mt-2 text-sm text-gray-400">
                          {destination.location},{" "}
                          {destination.country}
                        </p>

                        <button
                          onClick={() =>
                            navigate("/admin/destinations")
                          }
                          className="mt-5 text-sm font-semibold text-gray-700 transition hover:text-amber-500"
                        >
                          Manage destination →
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;