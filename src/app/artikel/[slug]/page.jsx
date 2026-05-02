import Image from "next/image";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";

export default function ArtikelDetail({ params }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) return notFound();

  const shareUrl = `https://yourdomain.com/artikel/${article.slug}`;

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* ================= HERO IMAGE ================= */}
        <Image
          src={article.image}
          alt={article.title}
          width={1000}
          height={600}
          className="rounded-2xl mb-10 object-cover"
        />

        {/* ================= META ================= */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            {article.date} • {article.author}
          </p>

          {/* TAG */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {article.tags?.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 px-3 py-1 rounded-full capitalize"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8">
          {article.title}
        </h1>

        {/* ================= HIGHLIGHT BOX ================= */}
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5 mb-10">
          <p className="text-sm text-gray-700 leading-relaxed">
            💡 Artikel ini membahas strategi dasar investasi properti untuk pemula
            agar dapat memulai dengan risiko minimal dan hasil optimal.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="
            prose 
            prose-sm 
            md:prose-base 
            max-w-none 
            text-gray-700
            prose-headings:text-gray-900
            prose-h2:mt-10
            prose-h2:mb-4
            prose-h3:mt-6
            prose-ul:list-disc
            prose-li:my-1
          "
          dangerouslySetInnerHTML={{
            __html: article.content.replace(/\n/g, "<br/>"),
          }}
        />

        {/* ================= CTA ================= */}
        <div className="mt-14 p-6 rounded-2xl bg-gray-50 text-center">

          <h3 className="font-semibold text-gray-900 mb-2">
            Tertarik Investasi Properti?
          </h3>

          <p className="text-gray-500 text-sm mb-5">
            Konsultasikan kebutuhan Anda dengan tim kami untuk mendapatkan rekomendasi terbaik.
          </p>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition"
          >
            Konsultasi Sekarang
          </a>

        </div>

        {/* ================= SHARE ================= */}
        <ShareButtons url={shareUrl} />

      </div>
    </section>
  );
}