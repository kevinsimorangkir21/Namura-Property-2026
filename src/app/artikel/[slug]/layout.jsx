const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const SITE_URL = "https://namuraproperty.com";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const res = await fetch(`${API_URL}/api/articles/slug/${slug}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return { title: "Artikel Tidak Ditemukan" };
        }

        const article = await res.json();

        const imageUrl = (() => {
            const img = article.thumbnail || article.image;
            if (!img) return `${SITE_URL}/Logo/Namura.png`;
            if (img.startsWith("http")) return img;
            if (img.startsWith("/Asset")) return `${SITE_URL}${img}`;
            return `${API_URL}/${img}`;
        })();

        const description =
            article.excerpt ||
            (article.content ? article.content.slice(0, 160) : `${article.title} - Artikel dari Namura Property.`);

        const authorName = article.author?.name || "Namura Property";

        return {
            title: article.title,
            description: description.slice(0, 160),
            keywords: [
                article.title,
                "artikel properti",
                "tips properti",
                "Namura Property",
                authorName,
            ].filter(Boolean),
            alternates: {
                canonical: `${SITE_URL}/artikel/${slug}`,
            },
            authors: [{ name: authorName }],
            openGraph: {
                title: `${article.title} | Namura Property`,
                description: description.slice(0, 160),
                url: `${SITE_URL}/artikel/${slug}`,
                type: "article",
                publishedTime: article.created_at,
                authors: [authorName],
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `${article.title} | Namura Property`,
                description: description.slice(0, 160),
                images: [imageUrl],
            },
        };
    } catch {
        return { title: "Artikel" };
    }
}

export default function ArticleSlugLayout({ children }) {
    return children;
}
