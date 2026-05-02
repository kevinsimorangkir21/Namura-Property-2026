import { blogs } from "@/data/blog";

export default function BlogDetail({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return <div className="container py-20">Blog not found</div>;
  }

  return (
    <section className="container py-20 max-w-3xl">
      
      {/* 🔹 IMAGE */}
      <img
        src={blog.image}
        className="w-full h-[350px] object-cover rounded-2xl mb-8"
      />

      {/* 🔹 TITLE */}
      <p className="text-sm text-gray-400 mb-2">{blog.date}</p>

      <h1 className="text-3xl font-semibold mb-4">
        {blog.title}
      </h1>

      {/* 🔹 CONTENT */}
      <p className="text-gray-600 leading-relaxed">
        {blog.content}
      </p>

    </section>
  );
}