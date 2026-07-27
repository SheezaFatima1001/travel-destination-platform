import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import DestinationCard from "./DestinationCard";

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();

        const featured = data.filter(
          (destination) => destination.featured === true
        );

        setDestinations(featured);
      } catch (error) {
        setError("Unable to load destinations.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section
      id="destinations"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500">
              Featured destinations
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Places that deserve a place on your bucket list.
            </h2>
          </div>

          <p className="max-w-md text-gray-500 leading-relaxed">
            Explore handpicked destinations and discover unforgettable places
            waiting to become part of your next adventure.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-16 text-center text-gray-500">
            Loading destinations...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-16 text-center text-red-500">
            {error}
          </div>
        )}

        {/* No Featured Destinations */}
        {!loading && !error && destinations.length === 0 && (
          <div className="mt-16 rounded-3xl bg-gray-50 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              No featured destinations yet
            </h3>

            <p className="mt-2 text-gray-500">
              Add some destinations with featured status enabled.
            </p>
          </div>
        )}

        {/* Destination Cards */}
        {!loading && destinations.length > 0 && (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedDestinations;