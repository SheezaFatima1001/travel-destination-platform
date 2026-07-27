import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const Destinations = () => {
  // =====================================================
  // URL SEARCH PARAMETERS
  // =====================================================

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  // =====================================================
  // STATE
  // =====================================================

  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // ACTIVE CATEGORY
  // =====================================================

  const activeCategory = categoryFromUrl
    ? categoryFromUrl.charAt(0).toUpperCase() +
      categoryFromUrl.slice(1)
    : "All";

  // =====================================================
  // FETCH DESTINATIONS FROM BACKEND
  // =====================================================

  useEffect(() => {
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

    fetchDestinations();
  }, []);

  // =====================================================
  // FEATURED DESTINATIONS FOR SLIDER
  // =====================================================

  const featuredDestinations = useMemo(() => {
    const featured = destinations.filter(
      (destination) => destination.featured === true
    );

    // If there are at least 3 featured destinations,
    // use only featured destinations for the slider.
    // Otherwise, use all destinations.
    if (featured.length >= 3) {
      return featured;
    }

    return destinations;
  }, [destinations]);

  // =====================================================
  // RESET SLIDER INDEX WHEN DATA CHANGES
  // =====================================================

  useEffect(() => {
    if (currentIndex >= featuredDestinations.length) {
      setCurrentIndex(0);
    }
  }, [featuredDestinations.length, currentIndex]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    if (featuredDestinations.length <= 1) {
      return;
    }

    setCurrentIndex((prevIndex) =>
      prevIndex === featuredDestinations.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const previousSlide = () => {
    if (featuredDestinations.length <= 1) {
      return;
    }

    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? featuredDestinations.length - 1
        : prevIndex - 1
    );
  };

  // =====================================================
  // AUTOMATIC SLIDER
  // =====================================================

  useEffect(() => {
    if (featuredDestinations.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredDestinations.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredDestinations.length]);

  // =====================================================
  // GET DESTINATION BASED ON SLIDE POSITION
  // =====================================================

  const getDestination = (offset) => {
    if (featuredDestinations.length === 0) {
      return null;
    }

    const length = featuredDestinations.length;

    const index =
      (currentIndex + offset + length) % length;

    return featuredDestinations[index];
  };

  // =====================================================
  // CATEGORIES
  // =====================================================

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

  // =====================================================
  // FILTER DESTINATIONS
  // =====================================================

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchValue = search.toLowerCase().trim();

      const destinationName =
        destination.name?.toLowerCase() || "";

      const country =
        destination.country?.toLowerCase() || "";

      const location =
        destination.location?.toLowerCase() || "";

      const category =
        destination.category?.toLowerCase() || "";

      // Search matching
      const matchesSearch =
        destinationName.includes(searchValue) ||
        country.includes(searchValue) ||
        location.includes(searchValue);

      // Category matching
      const matchesCategory =
        activeCategory === "All" ||
        category === activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [destinations, search, activeCategory]);

  // =====================================================
  // CURRENT SLIDER DESTINATIONS
  // =====================================================

  const leftDestination = getDestination(-1);
  const centerDestination = getDestination(0);
  const rightDestination = getDestination(1);

  // =====================================================
  // HANDLE CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (category) => {
    if (category === "All") {
      // Remove category from URL
      setSearchParams({});
    } else {
      // Add selected category to URL
      setSearchParams({
        category: category.toLowerCase(),
      });
    }
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* =================================================
          POPULAR DESTINATIONS SLIDER
      ================================================= */}

      <section className="relative overflow-hidden bg-[#050914] pb-20 pt-32">

        {/* Decorative Background Glow */}

        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          {/* Heading */}

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Discover the world
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Popular Destinations
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              See where other travellers are going and find
              your next unforgettable adventure.
            </p>

          </div>

          {/* =================================================
              SLIDER
          ================================================= */}

          {!loading &&
            !error &&
            featuredDestinations.length > 0 && (

              <div className="relative mt-16">

                {/* Previous Arrow */}

                <button
                  onClick={previousSlide}
                  aria-label="Previous destination"
                  className="absolute left-0 top-1/2 z-30 hidden h-14 w-14 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white backdrop-blur-md transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914] md:flex lg:-translate-x-6"
                >
                  ←
                </button>

                {/* Next Arrow */}

                <button
                  onClick={nextSlide}
                  aria-label="Next destination"
                  className="absolute right-0 top-1/2 z-30 hidden h-14 w-14 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl text-white backdrop-blur-md transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914] md:flex lg:translate-x-6"
                >
                  →
                </button>

                {/* Cards */}

                <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">

                  {/* LEFT CARD */}

                  {leftDestination && (
                    <div className="group relative hidden h-[360px] w-[25%] overflow-hidden rounded-3xl opacity-60 transition-all duration-700 md:block">

                      <img
                        src={leftDestination.imageUrl}
                        alt={leftDestination.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-6 left-6">

                        <p className="text-sm text-white/70">
                          {leftDestination.country}
                        </p>

                        <h3 className="mt-1 text-xl font-semibold text-white">
                          {leftDestination.name}
                        </h3>

                      </div>

                    </div>
                  )}

                  {/* CENTER CARD */}

                  {centerDestination && (
                    <div className="relative h-[500px] w-full max-w-[430px] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 transition-all duration-700 md:w-[48%]">

                      <img
                        src={centerDestination.imageUrl}
                        alt={centerDestination.name}
                        className="h-full w-full object-cover transition duration-700"
                      />

                      {/* Gradient */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Featured Badge */}

                      {centerDestination.featured && (
                        <div className="absolute left-6 top-6 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#050914]">
                          Featured
                        </div>
                      )}

                      {/* Center Card Content */}

                      <div className="absolute bottom-0 left-0 right-0 p-7">

                        <div className="flex items-center gap-2 text-sm text-white/70">

                          <span className="text-amber-400">
                            ●
                          </span>

                          <span>
                            {centerDestination.location},{" "}
                            {centerDestination.country}
                          </span>

                        </div>

                        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                          {centerDestination.name}
                        </h2>

                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">
                          {centerDestination.description}
                        </p>

                        <Link
                          to={`/destinations/${centerDestination._id}`}
                          className="mt-6 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-[#050914] transition hover:bg-amber-300"
                        >
                          Explore Destination
                          <span>→</span>
                        </Link>

                      </div>

                    </div>
                  )}

                  {/* RIGHT CARD */}

                  {rightDestination && (
                    <div className="group relative hidden h-[360px] w-[25%] overflow-hidden rounded-3xl opacity-60 transition-all duration-700 md:block">

                      <img
                        src={rightDestination.imageUrl}
                        alt={rightDestination.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-6 left-6">

                        <p className="text-sm text-white/70">
                          {rightDestination.country}
                        </p>

                        <h3 className="mt-1 text-xl font-semibold text-white">
                          {rightDestination.name}
                        </h3>

                      </div>

                    </div>
                  )}

                </div>

                {/* Mobile Navigation */}

                <div className="mt-8 flex justify-center gap-4 md:hidden">

                  <button
                    onClick={previousSlide}
                    aria-label="Previous destination"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914]"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next destination"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914]"
                  >
                    →
                  </button>

                </div>

                {/* Slider Progress */}

                <div className="mt-10 flex items-center justify-center gap-5">

                  <span className="text-sm font-semibold text-amber-400">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>

                  <div className="h-px w-20 bg-white/20">

                    <div
                      className="h-full bg-amber-400 transition-all duration-500"
                      style={{
                        width: `${
                          ((currentIndex + 1) /
                            featuredDestinations.length) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                  <span className="text-sm text-white/40">
                    {String(
                      featuredDestinations.length
                    ).padStart(2, "0")}
                  </span>

                </div>

              </div>
            )}

          {/* Loading */}

          {loading && (
            <div className="mt-16 flex justify-center">

              <div className="h-[500px] w-full max-w-[430px] animate-pulse rounded-[2rem] bg-white/10" />

            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="mt-16 text-center text-red-400">
              {error}
            </div>
          )}

          {/* No Destinations */}

          {!loading &&
            !error &&
            featuredDestinations.length === 0 && (
              <div className="mt-16 text-center text-white/60">
                No destinations available yet.
              </div>
            )}

        </div>

      </section>


      {/* =================================================
          EXPLORE DESTINATIONS
      ================================================= */}

      <section className="bg-[#f7f7f5] py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Introduction */}

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
              Explore everywhere
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#101828] md:text-5xl">
              Find your next escape
            </h2>

            <p className="mt-5 text-base leading-relaxed text-gray-500 md:text-lg">
              Search through our collection of incredible
              destinations and discover a place that feels
              like your next adventure.
            </p>

          </div>


          {/* Search */}

          <div className="mx-auto mt-12 max-w-3xl">

            <div className="group relative">

              <input
                type="text"
                placeholder="Search destinations, countries or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-7 py-5 pr-16 text-base text-gray-900 shadow-lg shadow-black/5 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-amber-400 focus:shadow-xl focus:shadow-amber-400/10 focus:ring-4 focus:ring-amber-400/10"
              />

              <div className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#050914] text-xl text-white transition duration-300 group-focus-within:bg-amber-400 group-focus-within:text-[#050914]">
                ⌕
              </div>

            </div>

          </div>


          {/* Category Filters */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#050914] text-white shadow-lg"
                    : "bg-white text-gray-500 shadow-sm hover:-translate-y-0.5 hover:bg-amber-400 hover:text-[#050914] hover:shadow-md"
                }`}
              >
                {category}
              </button>

            ))}

          </div>


          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div className="mt-24">

            <div className="mb-10 flex flex-col gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                  Your next journey
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#101828] md:text-4xl">

                  {activeCategory === "All"
                    ? "Explore all destinations"
                    : `Explore ${activeCategory} destinations`}

                </h3>

              </div>

              {/* Result Count */}

              <p className="text-sm text-gray-500">

                <span className="font-semibold text-[#101828]">
                  {filteredDestinations.length}
                </span>{" "}

                {filteredDestinations.length === 1
                  ? "destination"
                  : "destinations"}{" "}

                found

              </p>

            </div>


            {/* =================================================
                NO RESULTS
            ================================================= */}

            {filteredDestinations.length === 0 ? (

              <div className="rounded-[2rem] bg-white px-6 py-24 text-center shadow-sm">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/10 text-4xl">
                  🌍
                </div>

                <h3 className="mt-7 text-2xl font-bold text-[#101828]">
                  No destinations found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-gray-500">
                  We couldn't find a destination matching
                  your search. Try another place or explore a
                  different category.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-7 rounded-full bg-[#050914] px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-[#050914]"
                >
                  Explore all destinations
                </button>

              </div>

            ) : (

              /* =================================================
                  DESTINATION GRID
              ================================================= */

              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                {filteredDestinations.map(
                  (destination) => (

                    <Link
                      key={destination._id}
                      to={`/destinations/${destination._id}`}
                      className="group"
                    >

                      <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">

                        {/* Image */}

                        <div className="relative h-[300px] overflow-hidden">

                          <img
                            src={destination.imageUrl}
                            alt={destination.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />

                          {/* Image Gradient */}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                          {/* Category */}

                          <div className="absolute left-5 top-5">

                            <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#101828] shadow-lg backdrop-blur-sm">
                              {destination.category}
                            </span>

                          </div>

                          {/* Arrow */}

                          <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-amber-400 text-lg text-[#050914] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            →
                          </div>

                        </div>


                        {/* Card Content */}

                        <div className="p-6">

                          {/* Location */}

                          <div className="flex items-center gap-2 text-sm text-gray-400">

                            <span className="text-amber-500">
                              ●
                            </span>

                            <span>
                              {destination.location},{" "}
                              {destination.country}
                            </span>

                          </div>


                          {/* Name */}

                          <h4 className="mt-3 text-2xl font-bold text-[#101828] transition-colors group-hover:text-amber-500">
                            {destination.name}
                          </h4>


                          {/* Description */}

                          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
                            {destination.description}
                          </p>


                          {/* Card Footer */}

                          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                            <span className="text-sm font-semibold text-[#101828]">
                              Explore destination
                            </span>

                            <span className="text-lg text-amber-500 transition-transform duration-300 group-hover:translate-x-2">
                              →
                            </span>

                          </div>

                        </div>

                      </article>

                    </Link>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Destinations;