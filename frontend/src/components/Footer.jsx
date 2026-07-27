import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="text-3xl font-bold tracking-wide"
            >
              Wander<span className="text-amber-400">ly</span>
            </Link>

            <p className="mt-5 max-w-md leading-relaxed text-gray-400">
              Discover extraordinary destinations, explore new cultures,
              and find unforgettable experiences around the world.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-gray-300 transition hover:bg-amber-400 hover:text-gray-950"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-gray-300 transition hover:bg-amber-400 hover:text-gray-950"
              >
                ◎
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-gray-300 transition hover:bg-amber-400 hover:text-gray-950"
              >
                in
              </a>

            </div>

          </div>

          {/* Explore */}
          <div>

            <h3 className="font-semibold text-white">
              Explore
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                Home
              </Link>

              <Link
                to="/destinations"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                Destinations
              </Link>

              <Link
                to="/about"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                About Us
              </Link>

            </div>

          </div>

          {/* Company */}
          <div>

            <h3 className="font-semibold text-white">
              Company
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                to="/contact"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                Contact
              </Link>

              <a
                href="#"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="block text-gray-400 transition hover:text-amber-400"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between lg:px-10">

          <p>
            © {new Date().getFullYear()} Wanderly. All rights reserved.
          </p>

          <p>
            Discover. Explore. Wander.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;