import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDestinations = () => {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DESTINATIONS
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
      setError("Unable to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        destinations
          .map((destination) => destination.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [destinations]);

  // ==========================================
  // FILTER DESTINATIONS
  // ==========================================

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchValue = search.toLowerCase().trim();

      const name =
        destination.name?.toLowerCase() || "";

      const country =
        destination.country?.toLowerCase() || "";

      const location =
        destination.location?.toLowerCase() || "";

      const category =
        destination.category?.toLowerCase() || "";

      const matchesSearch =
        name.includes(searchValue) ||
        country.includes(searchValue) ||
        location.includes(searchValue);

      const matchesCategory =
        activeCategory === "All" ||
        category === activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [destinations, search, activeCategory]);

  // ==========================================
  // DELETE DESTINATION
  // ==========================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/destinations/${id}`
      );

      setDestinations((prevDestinations) =>
        prevDestinations.filter(
          (destination) => destination._id !== id
        )
      );

      alert("Destination deleted successfully.");
    } catch (err) {
      console.error("Error deleting destination:", err);
      alert("Unable to delete destination.");
    }
  };

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
            className="flex items-center gap-4 rounded-2xl px-5 py-4 text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>


          {/* Destinations */}

          <Link
            to="/admin/destinations"
            className="mt-2 flex items-center gap-4 rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-[#050914]"
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

        {/* Top Navbar */}

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-6 lg:px-10">

            <div>

              <p className="text-sm text-gray-400">
                Administration
              </p>

              <h1 className="text-xl font-bold">
                Destinations
              </h1>

            </div>


            <button
              onClick={() =>
                navigate("/admin/destinations/new")
              }
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#050914] transition hover:bg-amber-300"
            >
              Add New Destination
            </button>

          </div>

        </header>


        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="px-6 py-10 lg:px-10 lg:py-12">

          {/* Page Heading */}

          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
              Content Management
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Manage Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Add, update, or remove destinations displayed
              on your Wanderly travel website.
            </p>

          </div>


          {/* ==========================================
              SEARCH AND FILTER
          ========================================== */}

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}

              <div className="w-full lg:max-w-xl">

                <input
                  type="text"
                  placeholder="Search by destination, country, or location..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-full border border-gray-200 bg-[#f7f7f5] px-6 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                />

              </div>


              {/* Result Count */}

              <p className="text-sm text-gray-500">

                <span className="font-semibold text-[#101828]">
                  {filteredDestinations.length}
                </span>{" "}

                {filteredDestinations.length === 1
                  ? "destination"
                  : "destinations"}

              </p>

            </div>


            {/* Categories */}

            <div className="mt-6 flex flex-wrap gap-3">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-[#050914] text-white"
                      : "bg-[#f7f7f5] text-gray-500 hover:bg-amber-400 hover:text-[#050914]"
                  }`}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>


          {/* ==========================================
              LOADING
          ========================================== */}

          {loading && (

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="h-[450px] animate-pulse rounded-[2rem] bg-white"
                />

              ))}

            </div>

          )}


          {/* ==========================================
              ERROR
          ========================================== */}

          {!loading && error && (

            <div className="mt-10 rounded-[2rem] bg-white p-16 text-center">

              <h3 className="text-xl font-bold text-red-500">
                Unable to Load Destinations
              </h3>

              <p className="mt-3 text-gray-500">
                {error}
              </p>

              <button
                onClick={fetchDestinations}
                className="mt-6 rounded-full bg-[#050914] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-[#050914]"
              >
                Try Again
              </button>

            </div>

          )}


          {/* ==========================================
              NO RESULTS
          ========================================== */}

          {!loading &&
            !error &&
            filteredDestinations.length === 0 && (

              <div className="mt-10 rounded-[2rem] bg-white px-6 py-24 text-center">

                <h3 className="text-2xl font-bold">
                  No Destinations Found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-gray-500">
                  No destinations match your current
                  search or category filter.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-7 rounded-full bg-[#050914] px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-[#050914]"
                >
                  Clear Filters
                </button>

              </div>

            )}


          {/* ==========================================
              DESTINATION GRID
          ========================================== */}

          {!loading &&
            !error &&
            filteredDestinations.length > 0 && (

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredDestinations.map(
                  (destination) => (

                    <article
                      key={destination._id}
                      className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* Image */}

                      <div className="relative h-64 overflow-hidden">

                        <img
                          src={destination.imageUrl}
                          alt={destination.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />


                        {/* Featured */}

                        {destination.featured && (

                          <span className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#050914]">
                            Featured
                          </span>

                        )}

                      </div>


                      {/* Card Content */}

                      <div className="p-6">

                        <div className="flex items-center justify-between gap-3">

                          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                            {destination.category}
                          </span>

                          <span className="text-xs text-gray-400">
                            {destination.country}
                          </span>

                        </div>


                        <h3 className="mt-4 text-2xl font-bold">
                          {destination.name}
                        </h3>


                        <p className="mt-2 text-sm text-gray-400">
                          {destination.location}
                        </p>


                        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                          {destination.description}
                        </p>


                        {/* Actions */}

                        <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/destinations/edit/${destination._id}`
                              )
                            }
                            className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914]"
                          >
                            Edit
                          </button>


                          <button
                            onClick={() =>
                              handleDelete(
                                destination._id,
                                destination.name
                              )
                            }
                            className="flex-1 rounded-full border border-red-100 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
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

      </main>

    </div>
  );
};

export default AdminDestinations;