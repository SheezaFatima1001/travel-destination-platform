import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DestinationDetail = () => {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH SINGLE DESTINATION
  // =====================================================

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/destinations/${id}`
        );

        setDestination(response.data);
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Destination could not be found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050914]">
        <div className="text-center">

          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-amber-400" />

          <p className="mt-6 text-sm font-medium tracking-wide text-white/60">
            Preparing your journey...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR STATE
  // =====================================================

  if (error || !destination) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-6">

        <div className="max-w-md text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-400/10 text-5xl">
            🌍
          </div>

          <h1 className="mt-8 text-3xl font-bold text-[#101828]">
            Destination Not Found
          </h1>

          <p className="mt-4 leading-7 text-gray-500">
            We couldn't find the destination you're looking for.
            It may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#050914] px-7 py-4 font-semibold text-white transition hover:bg-amber-400 hover:text-[#050914]"
          >
            ← Explore Destinations
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="relative h-[85vh] min-h-[650px] overflow-hidden">

        {/* Background Image */}

        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Image Overlay */}

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/20 to-black/10" />

        {/* Hero Content */}

        <div className="relative z-10 flex h-full items-end">

          <div className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-24">

            {/* Back Link */}

            <Link
              to="/destinations"
              className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-amber-400 hover:bg-amber-400 hover:text-[#050914]"
            >
              <span>←</span>
              Back to destinations
            </Link>

            {/* Category */}

            <div>

              <span className="inline-flex items-center rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#050914]">
                {destination.category}
              </span>

            </div>

            {/* Destination Name */}

            <h1 className="mt-7 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              {destination.name}
            </h1>

            {/* Location */}

            <div className="mt-7 flex flex-wrap items-center gap-5 text-base text-white/80 md:text-lg">

              <div className="flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-400 backdrop-blur-md">
                  ●
                </span>

                <span>
                  {destination.location}, {destination.country}
                </span>

              </div>

              {destination.featured && (
                <>
                  <span className="hidden h-5 w-px bg-white/30 md:block" />

                  <span className="flex items-center gap-2 text-amber-300">
                    <span>★</span>
                    Featured Destination
                  </span>
                </>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          QUICK DESTINATION INFO
      ================================================= */}

      <section className="relative z-20 -mt-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-black/10 sm:grid-cols-3">

            {/* Location */}

            <div className="flex items-center gap-5 border-b border-gray-100 p-7 sm:border-b-0 sm:border-r">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                📍
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Location
                </p>

                <p className="mt-1 font-bold text-[#101828]">
                  {destination.location}
                </p>

              </div>

            </div>


            {/* Country */}

            <div className="flex items-center gap-5 border-b border-gray-100 p-7 sm:border-b-0 sm:border-r">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                🌎
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Country
                </p>

                <p className="mt-1 font-bold text-[#101828]">
                  {destination.country}
                </p>

              </div>

            </div>


            {/* Category */}

            <div className="flex items-center gap-5 p-7">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                ✦
              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Experience
                </p>

                <p className="mt-1 font-bold capitalize text-[#101828]">
                  {destination.category}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          ABOUT DESTINATION
      ================================================= */}

      <section className="py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">

            {/* Main Description */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
                Discover the destination
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Your journey begins in{" "}
                <span className="text-amber-500">
                  {destination.name}
                </span>
              </h2>

              <div className="mt-10 max-w-3xl">

                <p className="text-lg leading-9 text-gray-600">
                  {destination.description}
                </p>

              </div>

            </div>


            {/* Side Highlight */}

            <div className="flex items-end">

              <div className="w-full rounded-[2rem] bg-[#050914] p-8 md:p-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-2xl">
                  ✨
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  A place worth discovering
                </h3>

                <p className="mt-4 leading-7 text-white/60">
                  Every destination has a story waiting to be
                  experienced. Discover new places, create
                  unforgettable memories, and make your next
                  journey one to remember.
                </p>

                <div className="mt-8 h-px bg-white/10" />

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-sm text-white/40">
                    Travel category
                  </span>

                  <span className="font-semibold capitalize text-amber-400">
                    {destination.category}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          EXPERIENCE SECTION
      ================================================= */}

      <section className="bg-white py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
              The experience
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Why explore {destination.name}?
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Discover what makes this destination a memorable
              part of your travel journey.
            </p>

          </div>


          {/* Experience Cards */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="group rounded-[2rem] border border-gray-100 bg-[#f7f7f5] p-8 transition duration-500 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050914] text-2xl text-amber-400 transition group-hover:bg-amber-400 group-hover:text-[#050914]">
                🌄
              </div>

              <h3 className="mt-8 text-xl font-bold">
                Explore
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Discover the unique landscapes and places
                that make {destination.name} special.
              </p>

            </div>


            {/* Card 2 */}

            <div className="group rounded-[2rem] border border-gray-100 bg-[#f7f7f5] p-8 transition duration-500 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050914] text-2xl text-amber-400 transition group-hover:bg-amber-400 group-hover:text-[#050914]">
                📸
              </div>

              <h3 className="mt-8 text-xl font-bold">
                Experience
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Immerse yourself in the atmosphere, culture,
                and character of this incredible destination.
              </p>

            </div>


            {/* Card 3 */}

            <div className="group rounded-[2rem] border border-gray-100 bg-[#f7f7f5] p-8 transition duration-500 hover:-translate-y-2 hover:shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050914] text-2xl text-amber-400 transition group-hover:bg-amber-400 group-hover:text-[#050914]">
                🧭
              </div>

              <h3 className="mt-8 text-xl font-bold">
                Remember
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Turn your journey into unforgettable memories
                that stay with you long after you return home.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          DESTINATION DETAILS
      ================================================= */}

      <section className="py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            {/* Image */}

            <div className="relative overflow-hidden rounded-[2.5rem]">

              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="h-[550px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-8 left-8">

                <p className="text-sm font-medium text-white/70">
                  Explore
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {destination.name}
                </h3>

              </div>

            </div>


            {/* Details */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
                Destination information
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                Everything you need to know
              </h2>

              <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">

                {/* Location */}

                <div className="flex items-center justify-between py-6">

                  <span className="text-gray-500">
                    Location
                  </span>

                  <span className="font-semibold">
                    {destination.location}
                  </span>

                </div>


                {/* Country */}

                <div className="flex items-center justify-between py-6">

                  <span className="text-gray-500">
                    Country
                  </span>

                  <span className="font-semibold">
                    {destination.country}
                  </span>

                </div>


                {/* Category */}

                <div className="flex items-center justify-between py-6">

                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-semibold capitalize">
                    {destination.category}
                  </span>

                </div>


                {/* Featured */}

                <div className="flex items-center justify-between py-6">

                  <span className="text-gray-500">
                    Featured status
                  </span>

                  <span className="font-semibold">

                    {destination.featured ? (
                      <span className="text-amber-500">
                        ★ Featured
                      </span>
                    ) : (
                      "Popular destination"
                    )}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="pb-28 lg:pb-36">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#050914] px-8 py-20 text-center md:px-16">

            {/* Background Glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-400">
                Your next adventure awaits
              </p>

              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Ready to discover your next destination?
              </h2>

              <p className="mx-auto mt-6 max-w-xl leading-7 text-white/60">
                There are countless places waiting to be
                explored. Continue your journey and find
                somewhere new to experience.
              </p>

              <Link
                to="/destinations"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 font-semibold text-[#050914] transition hover:bg-amber-300"
              >
                Explore More Destinations
                <span></span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default DestinationDetail;