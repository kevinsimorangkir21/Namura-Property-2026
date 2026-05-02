import { blogs } from "@/data/blog";
import Link from "next/link";

export default function BlogPage() {
  return (
    <section className="container py-20">
      
      {/* 🔹 HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Our Blog
        </h1>
        <p className="text-gray-500">
          Insights, trends, and tips about real estate and modern living.
        </p>
      </div>

      {/* 🔹 GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
              
              <img
                src={blog.image}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <p className="text-xs text-gray-400 mb-2">
                  {blog.date}
                </p>

                <h3 className="font-semibold text-lg mb-2">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {blog.excerpt}
                </p>
              </div>

            </div>

          </Link>
        ))}
      </div>

    </section>
  );
}