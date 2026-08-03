import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-80 overflow-hidden">

        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Featured Badge */}
        {destination.featured && (
          <span className="absolute left-5 top-5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900">
            Featured
          </span>
        )}

        {/* Category */}
        <span className="absolute right-5 top-5 rounded-full bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
          {destination.category}
        </span>

        {/* Location */}
        <div className="absolute bottom-5 left-5 text-white">
          <p className="text-sm text-white/80">
            {destination.country}
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">

        <p className="text-sm text-gray-500">
          {destination.location}
        </p>

        <p className="mt-3 line-clamp-2 leading-relaxed text-gray-600">
          {destination.description}
        </p>

        {/* Rating and Popularity */}
        <div className="mt-4 flex gap-3">

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            ★ {destination.rating || 0}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            Popularity {destination.popularity || 0}
          </span>

        </div>

        {/* Explore Destination */}
        <Link
          to={`/destinations/${destination._id}`}
          className="mt-5 inline-block font-semibold text-gray-900 transition-colors hover:text-amber-500"
        >
          Explore destination
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>

    </article>
  );
};

export default DestinationCard;