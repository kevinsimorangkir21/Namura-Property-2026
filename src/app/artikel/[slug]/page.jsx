import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import ShareButtons from "@/components/ShareButtons";

export default async function ArtikelDetail({ params }) {
  const { slug } = await params;

  const article = articles.find(
    (a) => a.slug === slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const shareUrl = `/artikel/${article.slug}`;

  return (
    <section className="bg-white">
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <div className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Beranda
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/artikel"
            className="hover:text-gray-900"
          >
            Artikel
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {article.title}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {article.tags?.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-[#0F6A6A]/10 text-[#0F6A6A] text-sm font-medium capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mt-6 text-gray-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        <div className="mt-10 overflow-hidden rounded-[32px]">
          <Image
            src={article.image}
            alt={article.title}
            width={1400}
            height={800}
            priority
            className="w-full h-[550px] object-cover"
          />
        </div>

        <div className="mt-10 bg-[#0F6A6A]/5 border border-[#0F6A6A]/10 rounded-[24px] p-6">
          <h3 className="font-semibold text-gray-900">
            Ringkasan Artikel
          </h3>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <article
          className="
            prose
            prose-lg
            max-w-none
            mt-12

            prose-headings:text-gray-900
            prose-headings:font-bold

            prose-p:text-gray-700
            prose-p:leading-8

            prose-li:text-gray-700
            prose-li:leading-8

            prose-h2:text-3xl
            prose-h2:mt-12

            prose-h3:text-2xl

            prose-a:text-[#0F6A6A]
          "
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/^- (.*$)/gim, "<li>$1</li>")
              .replace(/\n/g, "<br />"),
          }}
        />

        <div className="mt-16 pt-10 border-t border-gray-100">
          <ShareButtons url={shareUrl} />
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900">
            Artikel Terkait
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                href={`/artikel/${item.slug}`}
                className="group"
              >
                <article className="border border-gray-100 rounded-[24px] overflow-hidden hover:shadow-lg transition">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="p-5">
                    <p className="text-sm text-gray-400">
                      {item.date}
                    </p>

                    <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-[#0F6A6A] transition">
                      {item.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-[#0F6A6A] rounded-[32px] p-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Siap Memulai Investasi Properti?
            </h2>

            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Konsultasikan kebutuhan properti Anda bersama tim
              profesional Namura Property.
            </p>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-8 h-12 px-8 rounded-full bg-white text-[#0F6A6A] font-semibold"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/artikel"
            className="text-[#0F6A6A] font-medium hover:underline"
          >
            ← Kembali ke Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}