import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl"> 
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-24 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-white"
            onClick={closeMenu}
          >
            Wander<span className="text-amber-400">ly</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">

            {/* Home */}
            <Link
              to="/"
              className="text-white transition-colors hover:text-amber-400"
            >
              Home
            </Link>

             {/* About */}
            <Link
              to="/about"
              className="text-white transition-colors hover:text-amber-400"
            >
              About
            </Link>

            {/* Destinations */}
            <Link
              to="/destinations"
              className="text-white transition-colors hover:text-amber-400"
            >
              Destinations
            </Link>

           

            {/* Contact */}
            <Link
              to="/contact"
              className="text-white transition-colors hover:text-amber-400"
            >
              Contact
            </Link>


 {/* Admin */}
            <Link
              to="/admin"
              className="text-white transition-colors hover:text-amber-400"
            >
              Admin
            </Link>
            {/* Explore Now */}
            <Link
              to="/destinations"
              className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-300"
            >
              Explore Now
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="text-2xl text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="space-y-4 rounded-2xl bg-black/80 p-6 backdrop-blur-md md:hidden">

            {/* Home */}
            <Link
              to="/"
              className="block text-white transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              Home
            </Link>

            {/* Destinations */}
            <Link
              to="/destinations"
              className="block text-white transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              Destinations
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="block text-white transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="block text-white transition-colors hover:text-amber-400"
              onClick={closeMenu}
            >
              Contact
            </Link>

            {/* Explore Now */}
            <Link
              to="/destinations"
              className="block rounded-full bg-amber-400 px-6 py-3 text-center font-semibold text-gray-900 transition-colors hover:bg-amber-300"
              onClick={closeMenu}
            >
              Explore Now
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;