"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="container py-20">
      
      {/* 🔹 HEADER */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Contact Us
        </h1>

        <p className="text-gray-500">
          Have questions or ready to find your dream property?  
          Our team is here to help you every step of the way.
        </p>
      </div>

      {/* 🔹 CONTENT */}
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* 📝 FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Send us a message
          </h2>

          <form className="space-y-4">
            
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-teal-600"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-teal-600"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-teal-600"
            />

            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 rounded-full hover:bg-teal-800 transition"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* 📍 INFO */}
        <div className="space-y-6">
          
          <h2 className="text-lg font-semibold mb-4">
            Contact Information
          </h2>

          {/* PHONE */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-gray-500 text-sm">+62 812 3456 7890</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-500 text-sm">info@namura.com</p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <p className="font-medium">Office</p>
              <p className="text-gray-500 text-sm">
                Jakarta, Indonesia <br />
                Namura Property HQ
              </p>
            </div>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="bg-gray-100 h-40 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
            Map Placeholder
          </div>

        </div>

      </div>

    </section>
  );
}