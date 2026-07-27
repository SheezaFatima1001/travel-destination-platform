import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import DestinationCard from "./DestinationCard";

const AllDestinations = ({ selectedCategory, setSelectedCategory }) => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();

        setDestinations(data);
        setFilteredDestinations(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(destinations.map((destination) => destination.category)),
  ];

  // Search + Category Filter
  useEffect(() => {
    let filtered = destinations;

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((destination) =>
        `${destination.name} ${destination.country} ${destination.location}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (destination) =>
          destination.category === selectedCategory
      );
    }

    setFilteredDestinations(filtered);
  }, [searchTerm, selectedCategory, destinations]);

  return (
    <section
      id="all-destinations"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500">
            Explore the world
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Find your next adventure.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-500">
            Browse our collection of incredible destinations and discover
            the perfect place for your next journey.
          </p>

        </div>

        {/* Search & Filter */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

           
            <input
              type="text"
              placeholder="Search destinations, countries or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-4 pl-14 pr-6 text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />

          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-full border border-gray-200 bg-gray-50 px-6 py-4 text-gray-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-gray-500">
            Loading destinations...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-20 text-center text-red-500">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {/* <div className="mt-8 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredDestinations.length}
              </span>{" "}
              destinations
            </div> */}

            {filteredDestinations.length > 0 ? (
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                  />
                ))}

              </div>
            ) : (
              <div className="mt-12 rounded-3xl bg-gray-50 p-16 text-center">

                <div className="text-5xl">
                  🌍
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  No destinations found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try searching for another destination or category.
                </p>

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default AllDestinations;