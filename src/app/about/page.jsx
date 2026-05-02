import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="container py-20 space-y-20">

      {/* 🔹 HERO ABOUT */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          About Namura Property
        </h1>

        <p className="text-gray-500">
          We are dedicated to creating modern, elegant, and high-quality living
          spaces that elevate your lifestyle.
        </p>
      </div>

      {/* 🔹 MAIN SECTION */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Building Dreams, One Home at a Time
          </h2>

          <p className="text-gray-600 mb-6">
            Namura Property is a forward-thinking real estate company focused on
            delivering exceptional living spaces. Our mission is to combine
            innovation, design, and comfort in every project we build.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="text-teal-600 w-5 h-5 mt-1" />
              <p className="text-sm text-gray-600">
                Expert engineers and architects
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="text-teal-600 w-5 h-5 mt-1" />
              <p className="text-sm text-gray-600">
                Premium quality materials
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="text-teal-600 w-5 h-5 mt-1" />
              <p className="text-sm text-gray-600">
                Modern and sustainable design
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <Image
            src="/about-main.jpg"
            alt="about"
            width={500}
            height={500}
            className="rounded-2xl"
          />
        </div>

      </div>

      {/* 🔹 STATS */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-teal-700">500+</h3>
          <p className="text-gray-500 text-sm mt-2">Properties Sold</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-teal-700">300+</h3>
          <p className="text-gray-500 text-sm mt-2">Happy Clients</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold text-teal-700">10+</h3>
          <p className="text-gray-500 text-sm mt-2">Years Experience</p>
        </div>

      </div>

      {/* 🔹 TEAM */}
      <div>
        <h2 className="text-2xl font-semibold text-center mb-10">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          {["team1.jpg", "team2.jpg", "team3.jpg"].map((img, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img src={`/${img}`} className="w-full h-56 object-cover" />

              <div className="p-4 text-center">
                <p className="font-semibold">Team Member</p>
                <p className="text-gray-500 text-sm">Real Estate Expert</p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}