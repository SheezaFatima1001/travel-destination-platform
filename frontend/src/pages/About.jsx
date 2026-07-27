import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white text-gray-950">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative min-h-[80vh] overflow-hidden bg-gray-950">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"
          alt="Beautiful travel landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">

          <div className="max-w-4xl">

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
              About Wanderly
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
              Travel is not just
              <span className="block text-amber-400">
                about the destination.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
              It is about the places you discover, the moments you experience,
              and the memories you bring back with you.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR STORY
      ====================================================== */}

      <section className="bg-white py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* ONLY CHANGE: rounded-[2rem] + overflow-hidden */}
          <div className="grid items-stretch overflow-hidden rounded-[2rem] lg:grid-cols-2">

            {/* Image */}
            <div className="relative min-h-[500px] overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1400&q=90"
                alt="Traveler exploring a destination"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>


            {/* Content */}
            <div className="flex items-center bg-gray-950 px-8 py-16 text-white md:px-14 lg:px-20">

              <div className="max-w-xl">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Our Story
                </p>

                <h2 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
                  We believe every journey
                  <span className="text-amber-400">
                    {" "}starts with curiosity.
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-400">

                  <p>
                    Wanderly was created with a simple idea: discovering a
                    new destination should feel exciting, inspiring, and
                    effortless.
                  </p>

                  <p>
                    With so many incredible places around the world, choosing
                    where to go next can sometimes feel overwhelming.
                  </p>

                  <p>
                    We bring destinations together in one place so travelers
                    can explore new possibilities and find inspiration for
                    their next adventure.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          THE WAY WE TRAVEL
      ====================================================== */}

      <section className="bg-[#f5f5f2] py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
              The Way We Travel
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-gray-950 md:text-6xl">
              Every traveler has
              <span className="block text-gray-400">
                their own way of exploring.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-500">
              Whether you are looking for an escape, chasing your next
              adventure, or simply curious about the world, your journey
              starts with discovering a place that feels right for you.
            </p>

          </div>


          {/* Travel Journey */}
          <div className="relative mt-20">

            {/* Connecting Line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-gray-300 md:block" />


            <div className="grid gap-6 md:grid-cols-3">

              {/* =========================================
                  ESCAPE
              ========================================== */}

              <div className="group relative">

                {/* ONLY CHANGE: rounded-[2rem] */}
                <div className="relative h-[420px] overflow-hidden rounded-[2rem]">

                  <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85"
                    alt="Peaceful travel escape"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 text-white">

                    <span className="text-sm font-medium text-amber-400">
                      01
                    </span>

                    <h3 className="mt-3 text-3xl font-semibold">
                      Escape
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                      Find places where you can slow down, breathe deeply,
                      and leave the everyday behind.
                    </p>

                  </div>

                </div>

              </div>


              {/* =========================================
                  EXPLORE
              ========================================== */}

              <div className="group relative md:mt-16">

                {/* ONLY CHANGE: rounded-[2rem] */}
                <div className="relative h-[420px] overflow-hidden rounded-[2rem]">

                  <img
                    src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85"
                    alt="Traveler exploring a new destination"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 text-white">

                    <span className="text-sm font-medium text-amber-400">
                      02
                    </span>

                    <h3 className="mt-3 text-3xl font-semibold">
                      Explore
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                      Discover new cities, cultures, landscapes, and
                      experiences that expand the way you see the world.
                    </p>

                  </div>

                </div>

              </div>


              {/* =========================================
                  EXPERIENCE
              ========================================== */}

              <div className="group relative">

                {/* ONLY CHANGE: rounded-[2rem] */}
                <div className="relative h-[420px] overflow-hidden rounded-[2rem]">

                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85"
                    alt="Beautiful beach travel experience"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 text-white">

                    <span className="text-sm font-medium text-amber-400">
                      03
                    </span>

                    <h3 className="mt-3 text-3xl font-semibold">
                      Experience
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                      Meet new people, experience different cultures, and
                      create memories that stay with you.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRAVEL PHILOSOPHY
      ====================================================== */}

      <section className="bg-white py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Text */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
                Our Philosophy
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                The best journeys
                <span className="block text-gray-400">
                  leave something behind.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600">
                A journey is not measured only by the distance you travel.
                It is measured by the stories you collect, the perspectives
                you gain, and the memories that stay with you.
              </p>

              <p className="mt-5 max-w-xl leading-relaxed text-gray-500">
                Wanderly exists to inspire people to look beyond the
                familiar and discover the places that make every journey
                meaningful.
              </p>

            </div>


            {/* Image */}
            <div className="relative">

              {/* ONLY CHANGE: rounded-[2rem] */}
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">

                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90"
                  alt="Mountain landscape"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

              </div>

              {/* Small Accent */}
              <div className="absolute -bottom-5 -left-5 hidden h-24 w-24 bg-amber-400 md:block" />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CINEMATIC CTA
      ====================================================== */}

      {/* ONLY CHANGE: rounded-[2rem] + mx-6/lg:mx-10 */}
      <section className="relative mx-6 min-h-[650px] overflow-hidden rounded-[2rem] bg-gray-950 lg:mx-10">

        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=90"
          alt="Beautiful travel destination"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[650px] items-center">

          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
                Your next journey
              </p>

              <h2 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
                There is a world
                <span className="block text-white/50">
                  waiting to be discovered.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
                From peaceful escapes to unforgettable adventures, discover
                a destination that feels right for your next journey.
              </p>

              <Link
                to="/destinations"
                className="group mt-10 inline-flex items-center gap-4 rounded-full bg-amber-400 px-8 py-4 font-semibold text-gray-950 transition duration-300 hover:bg-amber-300"
              >
                Explore Destinations

                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </section>


    </div>
  );
};

export default About;