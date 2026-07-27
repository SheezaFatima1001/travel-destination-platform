import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#101828]">

      {/* =====================================================
          PAGE BANNER
      ===================================================== */}

      <section className="relative h-[320px] overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85"
          alt="Travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#050914]/60" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050914]/80" />

        {/* Banner Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">

          <div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
              Wanderly
            </p>

            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>

            {/* Breadcrumb */}
            <div className="mt-5 flex items-center justify-center gap-3 text-sm">

              <Link
                to="/home"
                className="text-white/60 transition hover:text-amber-400"
              >
                Home
              </Link>

              <span className="text-amber-400">
                →
              </span>

              <span className="text-white">
                Contact
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTACT SECTION
      ===================================================== */}

      <section className="relative bg-[#050914] pb-32 pt-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Introduction */}

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Contact Us
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Let's start a conversation.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
              Have a question about a destination, want to share
              your travel story, or simply need some inspiration
              for your next adventure? We're here to help.
            </p>

          </div>


          {/* =================================================
              CONTACT CARD
          ================================================= */}

          <div className="relative z-10 mt-14 grid overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-[1.5fr_0.8fr]">


            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="p-8 sm:p-10 md:p-14">

              {/* Form Heading */}

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
                    Send Us A Message
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-[#101828] md:text-3xl">
                    How can we help you?
                  </h3>

                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-xl text-amber-500 sm:flex">
                  ✉
                </div>

              </div>


              {/* Success Message */}

              {submitted && (
                <div className="mt-7 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                  ✓ Thank you! Your message has been received.
                  We'll get back to you soon.
                </div>
              )}


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-9 space-y-7"
              >

                {/* Name + Email */}

                <div className="grid gap-7 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full border-b border-gray-200 bg-transparent px-1 py-3 text-sm text-[#101828] outline-none transition placeholder:text-gray-400 focus:border-amber-400"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full border-b border-gray-200 bg-transparent px-1 py-3 text-sm text-[#101828] outline-none transition placeholder:text-gray-400 focus:border-amber-400"
                    />

                  </div>

                </div>


                {/* Phone + Subject */}

                <div className="grid gap-7 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 XXX XXXXXXX"
                      className="w-full border-b border-gray-200 bg-transparent px-1 py-3 text-sm text-[#101828] outline-none transition placeholder:text-gray-400 focus:border-amber-400"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What can we help with?"
                      required
                      className="w-full border-b border-gray-200 bg-transparent px-1 py-3 text-sm text-[#101828] outline-none transition placeholder:text-gray-400 focus:border-amber-400"
                    />

                  </div>

                </div>


                {/* Message */}

                <div>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your travel plans..."
                    rows="5"
                    required
                    className="w-full resize-none border-b border-gray-200 bg-transparent px-1 py-3 text-sm text-[#101828] outline-none transition placeholder:text-gray-400 focus:border-amber-400"
                  />

                </div>


                {/* Submit Button */}

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#050914] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-amber-400 hover:text-[#050914]"
                >
                  Send Message

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </button>

              </form>

            </div>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div className="relative overflow-hidden bg-amber-400 p-8 sm:p-10 md:p-14">

              {/* Decorative Elements */}

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-[35px] border-white/10" />


              {/* Content */}

              <div className="relative z-10">

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#050914]/60">
                  Contact Info
                </p>

                <h3 className="mt-4 text-3xl font-bold leading-tight text-[#050914]">
                  Let's talk travel.
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#050914]/70">
                  We're always happy to hear from fellow
                  travelers. Reach out to us and let's start
                  planning your next adventure together.
                </p>


                {/* Contact Details */}

                <div className="mt-10 space-y-7">


                  {/* Location */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#050914] text-lg text-white">
                      📍
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#050914]/50">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#050914]">
                        Lahore, Pakistan
                      </p>

                    </div>

                  </div>


                  {/* Email */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#050914] text-lg text-white">
                      ✉
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#050914]/50">
                        Email
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#050914]">
                        hello@wanderly.com
                      </p>

                    </div>

                  </div>


                  {/* Phone */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#050914] text-lg text-white">
                      ☎
                    </div>

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#050914]/50">
                        Phone
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#050914]">
                        +92 300 1234567
                      </p>

                    </div>

                  </div>

                </div>


                {/* Social Media */}

                <div className="mt-12">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#050914]/50">
                    Follow our journey
                  </p>

                  <div className="mt-4 flex gap-3">

                    <a
                      href="#"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050914] font-bold text-white transition hover:scale-110"
                    >
                      f
                    </a>

                    <a
                      href="#"
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050914] font-bold text-white transition hover:scale-110"
                    >
                      ◎
                    </a>

                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050914] text-xs font-bold text-white transition hover:scale-110"
                    >
                      in
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="bg-[#f7f7f5] px-6 py-24">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
            Keep Exploring
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#101828] md:text-5xl">

            Your next adventure

            <span className="text-amber-500">
              {" "}is waiting.
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-500">
            Not ready to contact us yet? Explore our
            destinations and discover a place that inspires
            your next journey.
          </p>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#050914] px-8 py-4 font-semibold text-white transition duration-300 hover:bg-amber-400 hover:text-[#050914]"
          >
            Explore Destinations

            <span>
              →
            </span>

          </Link>

        </div>

      </section>

    </div>
  );
};

export default Contact;