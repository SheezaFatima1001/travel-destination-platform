import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

/**
 * Fonts: this design pairs a serif display face with a clean sans body
 * and a monospace face for data/labels (rating, popularity, coordinates).
 * Add to your index.html <head> for the intended look:
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
 *
 * Falls back gracefully to system serif/sans/mono if not loaded.
 */

const fontDisplay = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
const fontMono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

// ---------- Small icon set (replaces emoji for a more considered feel) ----------

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" {...props}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGlobe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12h18M12 3c2.8 2.6 4.2 5.7 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.7-4.2-9S9.2 5.6 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStar = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6 5.9 21l1.5-6.8-5.2-4.7 6.9-.7L12 2.5Z" />
  </svg>
);

const IconCompass = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMountain = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" {...props}>
    <path d="M3 19h18L15 7l-3.5 5.5L9 9.5 3 19Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAperture = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 3v6M12 15v6M4.2 7.8l5.2 3M14.6 13.2l5.2 3M4.2 16.2l5.2-3M14.6 10.8l5.2-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---------- Component ----------

const DestinationDetail = () => {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div className="flex min-h-screen items-center justify-center bg-[#07090F]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-[3px] border-white/10 border-t-[#C9A24B]" />
          <p
            className="mt-6 text-[13px] font-medium uppercase tracking-[0.25em] text-white/40"
            style={fontMono}
          >
            Preparing your journey
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
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#101828]/10 bg-white text-[#C9A24B] shadow-sm">
            <IconGlobe className="h-8 w-8" />
          </div>

          <h1
            className="mt-8 text-3xl font-semibold text-[#101828]"
            style={fontDisplay}
          >
            Destination not found
          </h1>

          <p className="mt-4 leading-7 text-[#101828]/55">
            We couldn't find the destination you're looking for.
            It may have been removed, or the link may be incorrect.
          </p>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#101828] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#C9A24B] hover:text-[#101828]"
          >
            <IconArrowLeft className="h-4 w-4" />
            Explore destinations
          </Link>
        </div>
      </div>
    );
  }

  const rating = destination.rating ? Number(destination.rating).toFixed(1) : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#101828] antialiased">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative h-[92vh] min-h-[680px] overflow-hidden bg-[#07090F]">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/35 to-[#07090F]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090F]/60 via-transparent to-transparent" />

        {/* Top bar */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-8 lg:px-10">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-md transition hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#07090F]"
          >
            <IconArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Destinations
          </Link>

          {rating && (
            <div
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/90 backdrop-blur-md sm:flex"
              style={fontMono}
            >
              <IconStar className="h-3.5 w-3.5 text-[#C9A24B]" />
              {rating} rated
            </div>
          )}
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex h-[calc(100%-88px)] w-full max-w-7xl flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-20">
          <span
            className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#C9A24B]"
            style={fontMono}
          >
            {destination.category}
          </span>

          <h1
            className="mt-5 max-w-4xl text-6xl font-medium leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl"
            style={fontDisplay}
          >
            {destination.name}
          </h1>

          <div className="mt-7 flex items-center gap-2.5 text-white/70">
            <IconPin className="h-4 w-4 text-[#C9A24B]" />
            <span className="text-base lg:text-lg">
              {destination.location}, {destination.country}
            </span>
            {destination.featured && (
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#C9A24B]/15 px-3 py-1 text-xs font-semibold text-[#C9A24B]">
                <IconStar className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex">
          <span className="text-[11px] uppercase tracking-[0.3em]" style={fontMono}>Scroll</span>
          <span className="h-8 w-px bg-white/25" />
        </div>
      </section>

      {/* =================================================
          BOARDING-PASS INFO STRIP (signature element)
      ================================================= */}

      <section className="relative z-20 -mt-12 px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-[#101828] shadow-2xl shadow-black/25 sm:flex-row">
            {/* Perforation divider for larger screens */}
            <div className="pointer-events-none absolute inset-y-0 left-1/4 hidden w-px sm:block">
              <div className="h-full w-px border-l border-dashed border-white/15" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px sm:block">
              <div className="h-full w-px border-l border-dashed border-white/15" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-3/4 hidden w-px sm:block">
              <div className="h-full w-px border-l border-dashed border-white/15" />
            </div>

            {[
              {
                icon: IconPin,
                label: "Location",
                value: destination.location,
              },
              {
                icon: IconGlobe,
                label: "Country",
                value: destination.country,
              },
              {
                icon: IconCompass,
                label: "Category",
                value: destination.category,
                capitalize: true,
              },
              {
                icon: IconStar,
                label: "Rating",
                value: rating ? `${rating} / 5` : "Not yet rated",
              },
            ].map(({ icon: Icon, label, value, capitalize }) => (
              <div
                key={label}
                className="flex flex-1 items-center gap-4 border-b border-white/10 px-7 py-7 last:border-b-0 sm:border-b-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A24B]/12 text-[#C9A24B]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40"
                    style={fontMono}
                  >
                    {label}
                  </p>
                  <p className={`mt-1 truncate font-semibold text-white ${capitalize ? "capitalize" : ""}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <div>
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#C9A24B]"
                style={fontMono}
              >
                About this destination
              </p>

              <h2
                className="mt-6 max-w-2xl text-4xl font-medium leading-tight tracking-tight md:text-5xl"
                style={fontDisplay}
              >
                Your journey begins in{" "}
                <span className="text-[#C9A24B]">{destination.name}</span>
              </h2>

              <p className="mt-9 max-w-2xl text-lg leading-9 text-[#101828]/65">
                {destination.description}
              </p>
            </div>

            {/* Highlight panel */}
            <div className="flex items-start">
              <div className="w-full rounded-[1.75rem] border border-[#101828]/8 bg-white p-9 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#101828] text-[#C9A24B]">
                  <IconAperture className="h-5 w-5" />
                </div>

                <h3
                  className="mt-7 text-xl font-medium text-[#101828]"
                  style={fontDisplay}
                >
                  A place worth discovering
                </h3>

                <p className="mt-3.5 text-[15px] leading-7 text-[#101828]/55">
                  Every destination has a story waiting to be experienced —
                  discover new places, and make your next journey one to
                  remember.
                </p>

                <div className="mt-7 h-px bg-[#101828]/8" />

                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-[#101828]/40">Travel category</span>
                  <span className="font-semibold capitalize text-[#101828]">
                    {destination.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY EXPLORE
      ================================================= */}

      <section className="border-y border-[#101828]/8 bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#C9A24B]"
                style={fontMono}
              >
                The experience
              </p>
              <h2
                className="mt-5 text-4xl font-medium tracking-tight md:text-5xl"
                style={fontDisplay}
              >
                Why explore {destination.name}?
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-7 text-[#101828]/50">
              Three reasons this destination stays with travelers long after
              they've left.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: IconMountain,
                title: "Explore",
                copy: `Discover the unique landscapes and places that make ${destination.name} special.`,
              },
              {
                icon: IconAperture,
                title: "Experience",
                copy: "Immerse yourself in the atmosphere, culture, and character of this destination.",
              },
              {
                icon: IconCompass,
                title: "Remember",
                copy: "Turn your journey into memories that stay with you long after you return home.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="group rounded-[1.75rem] border border-[#101828]/8 bg-[#FAF9F6] p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[#C9A24B]/30 hover:shadow-xl hover:shadow-[#101828]/5"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#101828] p-3.5 text-[#C9A24B] transition group-hover:bg-[#C9A24B] group-hover:text-[#101828]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-8 text-xl font-semibold text-[#101828]">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-[#101828]/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          DETAILS / SPEC SHEET
      ================================================= */}

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="h-[560px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-sm font-medium text-white/70">Explore</p>
                <h3
                  className="mt-1.5 text-3xl font-medium text-white"
                  style={fontDisplay}
                >
                  {destination.name}
                </h3>
              </div>
            </div>

            <div>
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#C9A24B]"
                style={fontMono}
              >
                Destination information
              </p>
              <h2
                className="mt-5 text-4xl font-medium tracking-tight md:text-5xl"
                style={fontDisplay}
              >
                Everything you need to know
              </h2>

              <div className="mt-10 divide-y divide-[#101828]/8 border-y border-[#101828]/8">
                {[
                  { label: "Location", value: destination.location },
                  { label: "Country", value: destination.country },
                  {
                    label: "Rating",
                    value: rating ? `${rating} / 5` : "Not rated",
                  },
                  { label: "Popularity", value: destination.popularity ?? 0 },
                  {
                    label: "Category",
                    value: destination.category,
                    capitalize: true,
                  },
                  {
                    label: "Featured status",
                    value: destination.featured ? "Featured" : "Popular destination",
                    accent: destination.featured,
                  },
                ].map(({ label, value, capitalize, accent }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-5"
                  >
                    <span className="text-[#101828]/45">{label}</span>
                    <span
                      className={`font-semibold ${capitalize ? "capitalize" : ""} ${
                        accent ? "text-[#C9A24B]" : "text-[#101828]"
                      }`}
                    >
                      {accent && <IconStar className="mr-1.5 -mt-0.5 inline h-3.5 w-3.5" />}
                      {value}
                    </span>
                  </div>
                ))}
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
          <div className="relative overflow-hidden rounded-[2rem] bg-[#101828] px-8 py-20 text-center md:px-16">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A24B]/10 blur-[100px]" />

            <div className="relative">
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#C9A24B]"
                style={fontMono}
              >
                Your next adventure awaits
              </p>

              <h2
                className="mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
                style={fontDisplay}
              >
                Ready to discover your next destination?
              </h2>

              <p className="mx-auto mt-6 max-w-xl leading-7 text-white/50">
                There are countless places waiting to be explored. Continue
                your journey and find somewhere new to experience.
              </p>

              <Link
                to="/destinations"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#C9A24B] px-8 py-4 font-semibold text-[#101828] transition hover:bg-white"
              >
                Explore more destinations
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
