import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    location: "",
    description: "",
    imageUrl: "",
    category: "",
    rating: "",
    popularity: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DESTINATION FOR EDITING
  // ==========================================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchDestination = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/destinations/${id}`
        );

        const destination = response.data;

        setFormData({
          name: destination.name || "",
          country: destination.country || "",
          location: destination.location || "",
          description: destination.description || "",
          imageUrl: destination.imageUrl || "",
          category: destination.category || "",
          rating: destination.rating ?? "",
          popularity: destination.popularity ?? "",
          featured: destination.featured || false,
        });
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Unable to load this destination.");
      } finally {
        setFetching(false);
      }
    };

    fetchDestination();
  }, [id, isEditMode]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const dataToSend = {
        ...formData,
        rating: Number(formData.rating),
        popularity: Number(formData.popularity),
      };

      if (isEditMode) {
        // UPDATE DESTINATION
        await axios.put(
          `http://localhost:5000/api/destinations/${id}`,
          dataToSend
        );
      } else {
        // ADD DESTINATION
        await axios.post(
          "http://localhost:5000/api/destinations",
          dataToSend
        );
      }

      // Return to admin destination list
      navigate("/admin/destinations");
    } catch (err) {
      console.error("Error saving destination:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save destination. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING EDIT DATA
  // ==========================================

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-400" />

          <p className="mt-5 text-gray-500">
            Loading destination...
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
            Wander<span className="text-amber-400">ly</span>
          </Link>
        </div>

        {/* Navigation */}

        <nav className="px-4">

          <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/30">
            Administration
          </p>

          <Link
            to="/admin"
            className="flex items-center rounded-2xl px-5 py-4 text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/destinations"
            className="mt-2 flex items-center rounded-2xl bg-amber-400 px-5 py-4 font-semibold text-[#050914]"
          >
            Destinations
          </Link>

        </nav>

        {/* Bottom */}

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

          <div className="flex min-h-20 items-center justify-between gap-5 px-6 lg:px-10">

            <div>

              <p className="text-sm text-gray-400">
                Administration
              </p>

              <h1 className="text-xl font-bold">
                {isEditMode
                  ? "Edit Destination"
                  : "Add Destination"}
              </h1>

            </div>

            <Link
              to="/admin/destinations"
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-amber-400 hover:bg-amber-400"
            >
              Cancel
            </Link>

          </div>

        </header>


        {/* ==========================================
            FORM CONTENT
        ========================================== */}

        <div className="px-6 py-10 lg:px-10 lg:py-12">

          <div className="mx-auto max-w-5xl">

            {/* Heading */}

            <div className="mb-10">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
                Destination Management
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {isEditMode
                  ? "Update Destination"
                  : "Create a New Destination"}
              </h2>

              <p className="mt-3 max-w-2xl text-gray-500">
                {isEditMode
                  ? "Update the destination information below and save your changes."
                  : "Add a new destination that travelers can discover on your website."}
              </p>

            </div>


            {/* Error */}

            {error && (
              <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            )}


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10"
            >

              {/* BASIC INFORMATION */}

              <div>

                <h3 className="text-xl font-bold">
                  Destination Information
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Provide the basic details about this destination.
                </p>

              </div>


              {/* Name and Country */}

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Destination Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Hunza Valley"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. Pakistan"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                </div>

              </div>


              {/* Location and Category */}

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Gilgit-Baltistan"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  >

                    <option value="">
                      Select a category
                    </option>

                    <option value="Mountains">
                      Mountains
                    </option>

                    <option value="Beaches">
                      Beaches
                    </option>

                    <option value="Cities">
                      Cities
                    </option>

                    <option value="Adventure">
                      Adventure
                    </option>

                  </select>

                </div>

              </div>


              {/* IMAGE */}

              <div className="mt-10 border-t border-gray-100 pt-10">

                <h3 className="text-xl font-bold">
                  Destination Image
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Add a direct image URL for the destination.
                </p>


                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Image URL
                  </label>

                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                </div>


                {/* Rating and Popularity */}

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  {/* Rating */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="e.g. 4.8"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      Enter a rating between 0 and 5.
                    </p>

                  </div>


                  {/* Popularity */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Popularity
                    </label>

                    <input
                      type="number"
                      name="popularity"
                      value={formData.popularity}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g. 95"
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                      Enter a popularity score.
                    </p>

                  </div>

                </div>


                {/* Image Preview */}

                {formData.imageUrl && (

                  <div className="mt-6 overflow-hidden rounded-[2rem]">

                    <img
                      src={formData.imageUrl}
                      alt="Destination preview"
                      className="h-64 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                  </div>

                )}

              </div>


              {/* DESCRIPTION */}

              <div className="mt-10 border-t border-gray-100 pt-10">

                <h3 className="text-xl font-bold">
                  Description
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Write an engaging description for travelers.
                </p>


                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Destination Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the destination, its attractions, and what makes it special..."
                    rows="7"
                    required
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-[#f7f7f5] px-5 py-4 text-sm leading-relaxed outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                  />

                </div>

              </div>


              {/* FEATURED */}

              <div className="mt-10 border-t border-gray-100 pt-10">

                <label className="flex cursor-pointer items-start gap-4">

                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 accent-amber-400"
                  />

                  <div>

                    <p className="font-semibold">
                      Featured Destination
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      Mark this destination as featured to
                      highlight it on the website.
                    </p>

                  </div>

                </label>

              </div>


              {/* FORM ACTIONS */}

              <div className="mt-10 flex flex-col-reverse gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:justify-end">

                <Link
                  to="/admin/destinations"
                  className="rounded-full border border-gray-200 px-7 py-3.5 text-center text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Link>


                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold text-[#050914] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : isEditMode
                    ? "Update Destination"
                    : "Add Destination"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
};

export default DestinationForm;