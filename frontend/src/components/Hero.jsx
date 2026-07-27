const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-3xl pt-20">

          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm font-semibold mb-6">
            Discover • Explore • Experience
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
            Explore the
            <span className="block text-amber-400">
              World.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Discover breathtaking destinations, hidden gems, and unforgettable
            experiences that will inspire your next adventure.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#destinations"
              className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-amber-300 transition-all hover:scale-105"
            >
              Explore Destinations
            </a>

            <a
              href="#about"
              className="border border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Discover More
            </a>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#destinations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>

        <span className="text-xl animate-bounce">
          ↓
        </span>
      </a>
    </section>
  );
};

export default Hero;