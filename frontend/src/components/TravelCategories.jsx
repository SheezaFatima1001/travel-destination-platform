import { Link } from "react-router-dom";

const categories = [
    {
        name: "Mountains",
        slug: "mountains",
        description:
            "Reach new heights and discover breathtaking landscapes.",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    },
    {
        name: "Beaches",
        slug: "beaches",
        description:
            "Relax beside crystal-clear waters and golden sands.",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    },
    {
        name: "Cities",
        slug: "cities",
        description:
            "Experience vibrant streets, culture, and unforgettable landmarks.",
        image:
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=85",
    },
    {
        name: "Adventure",
        slug: "adventure",
        description:
            "Step outside your comfort zone and chase unforgettable experiences.",
        image:
            "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1000&q=85",
    },
];

const TravelCategories = () => {
    return (
        <section
            id="categories"
            className="bg-gray-950 py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">

                {/* Heading */}
                <div className="max-w-3xl">

                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                        Explore by category
                    </p>

                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Find the journey that
                        <span className="text-amber-400">
                            {" "}speaks to you.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
                        Whether you dream of peaceful beaches, breathtaking mountains,
                        exciting cities, or thrilling adventures, discover a destination
                        that matches your travel style.
                    </p>

                </div>


                {/* Category Grid */}
                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (

                        <Link
                            key={category.name}
                            to={`/destinations?category=${category.slug}`}
                            className="group relative block h-[450px] w-full cursor-pointer overflow-hidden rounded-3xl text-left"
                        >

                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />


                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-all duration-500 group-hover:from-black/80" />


                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-7">

                                <h3 className="text-3xl font-bold text-white">
                                    {category.name}
                                </h3>

                                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-gray-200 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                                    {category.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 font-semibold text-amber-400">
                                    Explore

                                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                                        →
                                    </span>
                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>
        </section>
    );
};

export default TravelCategories;